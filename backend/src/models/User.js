import db from "../config/db.js";

const User =  {
    findByEmail: async (email) => {
        const { rows } = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return rows[0];
    },

    findById: async (id) => {
        const { rows } = await db.query (
            'SELECT user_id, fname, lname, email, role FROM users WHERE user_id = $1',
            [id]
        );
        return rows[0];
    },

    create: async (userData) => {
        const {fname, lname, email, password} = userData;
        const { rows } = await db.query(
            'INSERT INTO users (fname, lname, email, password) VALUES($1, $2, $3, $4) RETURNING user_id',
            [fname, lname, email, password]
        );
        return rows[0].user_id;
    }
};

export default User;