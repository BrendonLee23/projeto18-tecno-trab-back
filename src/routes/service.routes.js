import { Router } from 'express';
import { createService, deleteService, getAllServices } from '../controllers/servicesController.js';
import serviceSchema from '../schemas/serviceSchema.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { validateToken } from '../middlewares/authSchema.middleware.js';

const serviceRouter = Router();

/* serviceRouter.post('/service', validateSchema(serviceSchema), createService); */
serviceRouter.get('/home', getAllServices);
serviceRouter.post('/service/create', validateToken, validateSchema(serviceSchema), createService);
serviceRouter.post('/service/edit', validateToken, createService);
serviceRouter.delete('/service/delete/:id', validateToken, deleteService);

export default serviceRouter;