import {db} from "../database/database.connection.js";

async function getUserByEmail(payload){
    const {email} = payload

    const existingUser = await db.query(`
    SELECT * FROM users WHERE email=$1
`, [email]);
    return existingUser;
}




const userRepository = {
    getUserByEmail
}

export default userRepository;

