import joi from 'joi';

const serviceSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    description: joi.string().max(100),
    phoneNumber: joi.string().required()
});

export default serviceSchema;