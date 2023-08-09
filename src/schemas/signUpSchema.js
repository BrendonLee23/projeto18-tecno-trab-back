import joi from 'joi';

// Esquema de validação para a tabela 'users'
const userSchema = joi.object({
    name: joi.string().required(),
    born: joi.date().required(),
    email: joi.string().email().required(),
    confirmPassword: joi.string().required(),
    password: joi.string().required(),
    address: joi.string().required(),
    phoneNumber: joi.string().required()
});

export default userSchema;