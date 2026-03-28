import pkg from 'pg';
const { Pool: PgPool } = pkg;
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const migrateData = async () => {
    // 1. Connect to MySQL (Source)
    const mysqlPool = mysql.createPool({
        host: process.env.MYSQL_DB_HOST,
        port: process.env.MYSQL_DB_PORT || 3306,
        user: process.env.MYSQL_DB_USER,
        password: process.env.MYSQL_DB_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        ssl: { rejectUnauthorized: false }
    });

    // 2. Connect to PostgreSQL (Target)
    const pgPool = new PgPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: { rejectUnauthorized: false }
    });

    console.log('--- Starting Safe Data Migration ---');

    try {
        // Fetch from MySQL
        console.log('[1/4] Fetching users from MySQL...');
        const [mysqlUsers] = await mysqlPool.execute('SELECT * FROM users');
        console.log(`> Found ${mysqlUsers.length} users in MySQL.`);

        if(mysqlUsers.length === 0) {
            console.log('No data to migrate. Exiting.');
            return;
        }

        // Connect PG Client for Transaction
        console.log('[2/4] Initializing PostgreSQL transaction...');
        const pgClient = await pgPool.connect();
        
        try {
            await pgClient.query('BEGIN');

            console.log('[3/4] Migrating data...');
            let migratedCount = 0;

            for (const user of mysqlUsers) {
                // Idempotent Insert using ON CONFLICT DO NOTHING
                const insertQuery = `
                    INSERT INTO users (fname, lname, email, password, role, created_at)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    ON CONFLICT (email) DO NOTHING
                    RETURNING user_id;
                `;
                const values = [
                    user.fname,
                    user.lname,
                    user.email,
                    user.password,
                    user.role,
                    user.created_at
                ];

                const result = await pgClient.query(insertQuery, values);
                if (result.rowCount > 0) {
                    migratedCount++;
                    console.log(`  - Migrated User: ${user.email}`);
                } else {
                    console.log(`  - Skipped (Already exists): ${user.email}`);
                }
            }

            await pgClient.query('COMMIT');
            console.log(`> Successfully migrated ${migratedCount} new users.`);

        } catch (txError) {
            await pgClient.query('ROLLBACK');
            console.error('! Transaction Failed, rolling back changes: ', txError.message);
        } finally {
            pgClient.release();
        }

        // Parity Check
        console.log('[4/4] Performing Integrity Check...');
        const { rows } = await pgPool.query('SELECT COUNT(*) FROM users');
        const pgCount = parseInt(rows[0].count, 10);
        console.log(`> Parity Check -> MySQL rows: ${mysqlUsers.length} | PostgreSQL rows: ${pgCount}`);
        
        if (pgCount >= mysqlUsers.length) {
            console.log('✅ Migration Integrity Verified.');
        } else {
            console.log('⚠️ Warning: PostgreSQL row count is less than MySQL row count.');
        }

    } catch (error) {
        console.error('Migration failed completely:', error.message);
    } finally {
        await mysqlPool.end();
        await pgPool.end();
        console.log('--- Migration Finished ---');
        process.exit();
    }
};

migrateData();
