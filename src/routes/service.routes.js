import { Router } from 'express';
import { createService, getAllServices } from '../controllers/servicesController.js';
import serviceSchema from '../schemas/serviceSchema.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { validateToken } from '../middlewares/authSchema.middleware.js';

const serviceRouter = Router();

serviceRouter.post('/service', validateSchema(serviceSchema), createService);
serviceRouter.post('/service', validateToken, validateSchema(serviceSchema), createService);
serviceRouter.get('/service',  getAllServices);

export default serviceRouter;