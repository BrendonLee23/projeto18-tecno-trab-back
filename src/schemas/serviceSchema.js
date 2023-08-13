import joi from 'joi';

const serviceSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    description: joi.string().max(100)
});

export default serviceSchema;