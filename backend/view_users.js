import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const viewData = async () => {
    const pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: false
        }
    });

    console.log('Fetching users from PostgreSQL...');

    try {
        const { rows } = await pool.query('SELECT * FROM users');
        
        if (rows.length === 0) {
            console.log('--- The users table is currently empty! ---');
        } else {
            console.log('\n--- USERS TABLE DATA ---');
            console.table(rows);
        }

    } catch (error) {
        console.error('Failed to fetch data:', error.message);
    } finally {
        await pool.end();
        process.exit();
    }
};

viewData();
