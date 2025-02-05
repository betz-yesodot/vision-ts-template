import { z } from 'zod';
import { zodMongoObjectId } from '../../utils/zod.js';

const requiredFields = z
    .object({
        name: z.string(),
        status: z.boolean(),
    })
    .required();

// GET /api/services
export const getAllQueryRequestSchema = z.object({
    body: z.object({}),
    query: z.object({ }),
    params: z.object({}),
});

// POST /api/features
export const createOneRequestSchema = z.object({
    body: requiredFields,
    query: z.object({}),
    params: z.object({}),
});

// PUT /api/features/:id
export const updateOneRequestSchema = z.object({
    body: requiredFields.partial(),
    query: z.object({}),
    params: z.object({
        id: zodMongoObjectId,
    }),
});

// DELETE /api/features/:id
export const deleteOneRequestSchema = z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
        id: zodMongoObjectId,
    }),
});
