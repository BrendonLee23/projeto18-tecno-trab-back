
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { db } from '../database/database.connection.js';
import { format } from 'date-fns';
import userRepository from '../repository/user.repository.js';


export async function createUser(req, res) {

    const {user} = req.body;

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
        await userRepository.insertUser(req.body)

        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message);
    }

}
export async function userLogin(req, res) {

    try {

        const existingUser = await userRepository.getUserByEmail(req.body);

        if (!existingUser.rows[0]) {
            return res.sendStatus(401);
        }
        const user = existingUser.rows[0];
        const token = await userRepository.login(user)
        if(token) {
        res.status(200).send({ token, userName: user.name, userId: user.id });
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
        const users = await userRepository.getUsers()
        res.send(users.rows).status(200)
    } catch (err) {
        res.status(500).send(err.message)
    }

}
