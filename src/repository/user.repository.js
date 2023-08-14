import {db} from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

async function getUserByEmail(payload){
    const {email} = payload

    const existingUser = await db.query(`
    SELECT * FROM users WHERE email=$1
`, [email]);
    return existingUser;
}
async function insertUser(payload){

    const user = payload;

    const passwordHash = bcrypt.hashSync(user.password, 10);
    const confirmPasswordHash = bcrypt.hashSync(user.confirmPassword, 10);

    const formattedBorn = format(new Date(user.born), 'yyyy-MM-dd');

    await db.query(`
    
    INSERT INTO users (name, born, email, password, "confirmPassword", address, "phoneNumber")
    VALUES ($1, $2, $3, $4, $5, $6, $7)

    `, [user.name, formattedBorn, user.email, passwordHash, confirmPasswordHash, user.address, user.phoneNumber]);
}
async function getUsers(){
    const users = await db.query(`SELECT id, name, to_char(born, 'YYYY-MM-DD') as born, email, password, address, "phoneNumber" FROM users;`)
        return users;
}
async function login(user){



    if (bcrypt.compareSync(password, user.password)) {

        const token = v4();

        await db.query(`
        INSERT INTO sessions(token, "userId") VALUES ($1, $2)
        `, [token, user.id]);
        return token;
    } else{
        return null;
    }
}

const userRepository = {
    getUserByEmail,
    getUsers,
    insertUser,
    login
}

export default userRepository;

