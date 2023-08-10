
import bcrypt from 'bcrypt';
import { db } from '../database/database.connection.js';
import { v4 } from 'uuid';


export async function createUser(req, res) {

    const user = req.body;

    try {

        let isValid = true;
        let errorMessage = '';

        function isValidDate(dateString) {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            return dateString.match(dateRegex);
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return email.match(emailRegex);
        }

        const existingUser = await db.query(`
            SELECT * FROM users WHERE email=$1
        `, [user.email]);

        if (existingUser.rowCount > 0) {
            isValid = false;
            errorMessage = 'E-mail já cadastrado';
        } else if (user.password !== user.confirmPassword) {
            isValid = false;
            errorMessage = 'As senhas não coincidem';
        } else if (!isValidDate(user.born)) {
            isValid = false;
            errorMessage = 'Formato de data de nascimento inválido';
        } else if (!isValidEmail(user.email)) {
            isValid = false;
            errorMessage = 'Formato de e-mail inválido';
        } else if (!user.address) {
            isValid = false;
            errorMessage = 'O endereço é obrigatório';
        } else if (!user.phoneNumber) {
            isValid = false;
            errorMessage = 'O número de telefone é obrigatório';
        } else if (!user.name) {
            isValid = false;
            errorMessage = 'O nome é obrigatório';
        }

        if (!isValid) {
            return res.status(400).send(errorMessage);
        }

        const passwordHash = bcrypt.hashSync(user.password, 10);
        const confirmPasswordHash = bcrypt.hashSync(user.confirmPassword, 10);

        await db.query(`
        
            INSERT INTO users(name, to_char(born, 'YYYY-MM-DD') as born, email, password, "confirmPassword", address, "phoneNumber")
            VALUES ($1, $2, $3, $4, $5, $6, $7)

        `, [user.name, user.born, user.email, passwordHash, confirmPasswordHash, user.adress, user.phoneNumber]);

        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message);
    }

}
export async function userLogin(req, res) {

    const { email, password } = req.body;

    try {

        const { rows: users } = await db.query(`
        SELECT * FROM users WHERE email=$1
        `, [email]);

        const [user] = users;

        if (!user) {
            return res.sendStatus(401);
        }

        if (bcrypt.compareSync(password, user.password)) {

            const token = v4();

            await db.query(`
            INSERT INTO sessions(token, "userId") VALUES ($1, $2)
            `, [token, user.id]);
            return res.send( token );
        } 
        else {
            res.sendStatus(401)
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getUser(req, res) {

    try {
        const users = await db.query(`SELECT id, name, to_char(born, 'YYYY-MM-DD') as born, email, password, address, "phoneNumber" FROM users;`)
        res.send(users.rows).status(200)
    } catch (err) {
        res.status(500).send(err.message)
    }

}
