
import bcrypt from 'bcrypt';
import { db } from '../database/database.connection.js';
import { v4 } from 'uuid';
import { format } from 'date-fns'; 
import userRepository from '../repository/user.repository.js';


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

        const existingUser = await userRepository.getUserByEmail(req.body);

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

        const formattedBorn = format(new Date(user.born), 'yyyy-MM-dd');

        await db.query(`
        
        INSERT INTO users (name, born, email, password, "confirmPassword", address, "phoneNumber")
        VALUES ($1, $2, $3, $4, $5, $6, $7)

        `, [user.name, formattedBorn, user.email, passwordHash, confirmPasswordHash, user.address, user.phoneNumber]);


        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message);
    }

}
export async function userLogin(req, res) {

    const { password } = req.body;


    try {

        const existingUser = await userRepository.getUserByEmail(req.body);

        if (!existingUser) {
            return res.sendStatus(401);
        }
        const [user] = existingUser.rows;

        if (bcrypt.compareSync(password, user.password)) {

            const token = v4();

            await db.query(`
            INSERT INTO sessions(token, "userId") VALUES ($1, $2)
            `, [token, user.id]);
            return res.send(token);
        }
        else {
            res.sendStatus(401)
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}
export async function getUsers(req, res) {

    try {
        const users = await userRepository.getUsers(req.body)
        res.send(users.rows).status(200)
    } catch (err) {
        res.status(500).send(err.message)
    }

}
