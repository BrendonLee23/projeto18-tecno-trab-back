import {db} from "../database/database.connection.js";

async function getUserByEmail(payload){
    const {email} = payload

    const existingUser = await db.query(`
    SELECT * FROM users WHERE email=$1
`, [email]);
    return existingUser;
}

/* async function startSession(payload){
    const {existingUser} = payload;
    console.log(existingUser, vasco);
    const token = v4();

            await db.query(`
            INSERT INTO sessions(token, "userId") VALUES ($1, $2)
            `, [token, user.id]);
} */

async function getUsers(payload){
    const users = await db.query(`SELECT id, name, to_char(born, 'YYYY-MM-DD') as born, email, password, address, "phoneNumber" FROM users;`)
        return users;
}

const userRepository = {
    getUserByEmail,
    getUsers
}

export default userRepository;

