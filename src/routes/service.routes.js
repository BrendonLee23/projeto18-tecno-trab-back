import { Router } from 'express';
import { createService, deleteService, editService, editStatusService, getAllServices, getServicesById } from '../controllers/servicesController.js';
import serviceSchema from '../schemas/serviceSchema.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { validateToken } from '../middlewares/authSchema.middleware.js';

const serviceRouter = Router();

/* serviceRouter.post('/service', validateSchema(serviceSchema), createService); */
serviceRouter.get('/home', getAllServices);
serviceRouter.get('/home/:id', getServicesById);
serviceRouter.post('/service/create', validateToken, validateSchema(serviceSchema), createService);
serviceRouter.put('/service/edit/:id', validateToken, validateSchema(serviceSchema), editService);
serviceRouter.put('/service/edit/status/:id', validateToken, editStatusService);
serviceRouter.delete('/service/delete/:id', validateToken, deleteService);

export default serviceRouter;
