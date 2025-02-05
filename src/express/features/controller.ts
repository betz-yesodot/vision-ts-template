import { Response } from 'express';
import { TypedRequest } from '../../utils/zod.js';
import { ServicesManager } from './manager.js';
import {
    createOneRequestSchema,
    deleteOneRequestSchema,
    getAllQueryRequestSchema,
    updateOneRequestSchema,
} from './validations.js';

export class ServicessController {
    static getAllQuery = async (_req: TypedRequest<typeof getAllQueryRequestSchema>, res: Response) => {

        res.json(await ServicesManager.getAllQuery());
    };

    static createOne = async (req: TypedRequest<typeof createOneRequestSchema>, res: Response) => {
        res.json(await ServicesManager.createOne(req.body));
    };

    static updateOne = async (req: TypedRequest<typeof updateOneRequestSchema>, res: Response) => {
        const {  status, ...query } = req.query;

        res.json(await ServicesManager.updateOne(req.params.id, {status}));
    };

    static deleteOne = async (req: TypedRequest<typeof deleteOneRequestSchema>, res: Response) => {
        res.json(await ServicesManager.deleteOne(req.params.id));
    };
}
