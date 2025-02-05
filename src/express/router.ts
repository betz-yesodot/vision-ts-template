import { Router } from 'express';
import { servicesRouter } from './Services/router.js';

export const appRouter = Router();

appRouter.use('/api/services', servicesRouter);

appRouter.use(['/isAlive', '/isalive', '/health'], (_req, res) => {
    res.status(200).send('alive');
});

appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});
