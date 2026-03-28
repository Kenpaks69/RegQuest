import pkg from 'pg';
const { Pool } = pkg;
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
    const pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: { rejectUnauthorized: false }
    });

    console.log('Connecting to PostgreSQL...');

    const adminDetails = {
        fname: 'Admin',
        lname: 'Master',
        email: 'admin@gmail.com',
        password: 'adminpassword123',
        role: 'admin'
    };

    try {
        const client = await pool.connect();
        
        try {
            console.log('Hashing password securely...');
            const salt = 10;
            const hashedPassword = await bcrypt.hash(adminDetails.password, salt);

            const query = `
                INSERT INTO users (fname, lname, email, password, role)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (email) DO NOTHING
                RETURNING user_id;
            `;
            const values = [
                adminDetails.fname,
                adminDetails.lname,
                adminDetails.email,
                hashedPassword,
                adminDetails.role
            ];

            console.log('Inserting into database...');
            const { rowCount } = await client.query(query, values);

            if (rowCount > 0) {
                console.log(`Success! Admin account created for ${adminDetails.email}.`);
            } else {
                console.log(`Note: An account with ${adminDetails.email} already exists.`);
            }

        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Failed to create Admin:', error.message);
    } finally {
        await pool.end();
        process.exit();
    }
};

seedAdmin();
