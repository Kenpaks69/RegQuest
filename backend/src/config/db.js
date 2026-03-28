import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 10,
    ssl: {
        rejectUnauthorized: false
    }
});

try {
    const client = await pool.connect();
    console.log("PostgreSQL Database connected successfully.");
    client.release();
} catch (error) {
    console.error("Error connecting to database.", error.message);
}

export default pool;
