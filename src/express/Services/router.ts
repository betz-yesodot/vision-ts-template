import { Router } from 'express';
import { validateRequest, wrapController } from '../../utils/express/wrappers.js';
import { ServicessController } from './controller.js';
import {
    createOneRequestSchema,
    deleteOneRequestSchema,
    getAllQueryRequestSchema,
    updateOneRequestSchema,
} from './validations.js';

export const servicesRouter = Router();

servicesRouter.get('/', validateRequest(getAllQueryRequestSchema), wrapController(ServicessController.getAllQuery));

servicesRouter.post('/', validateRequest(createOneRequestSchema), wrapController(ServicessController.createOne));

servicesRouter.put('/:id', validateRequest(updateOneRequestSchema), wrapController(ServicessController.updateOne));

servicesRouter.delete('/:id', validateRequest(deleteOneRequestSchema), wrapController(ServicessController.deleteOne));
