/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Express } from 'express';
import mongoose from 'mongoose';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { config } from '../src/config.js';
import { Server } from '../src/express/server.js';

const { mongo } = config;
const fakeObjectId = '111111111111111111111111';

const removeAllCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection!.deleteMany({});
    }
};

describe('e2e services API testing', () => {
    let app: Express;

    beforeAll(async () => {
        await mongoose.connect(mongo.uri);
        app = Server.createExpressApp();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    beforeEach(async () => {
        await removeAllCollections();
    });

    describe('/isAlive', () => {
        it('should return alive', async () => {
            const response = await request(app).get('/isAlive').expect(200);
            expect(response.text).toBe('alive');
        });
    });

    describe('/unknownRoute', () => {
        it('should return status code 404', async () => {
            return request(app).get('/unknownRoute').expect(404);
        });
    });

    describe('/api/services', () => {
        const exampleService = { name: 'test', status: true };

        describe('GET /api/services', () => {
            it('should get all the services', async () => {
                for (let i = 0; i < 3; i++) {
                    await request(app).post('/api/services').send(exampleService).expect(200);
                }
                const { body } = await request(app).get('/api/services').expect(200);
                expect(body.length).toBe(3);
            });
        });

        describe('POST /api/services', () => {
            it('should create a new service', async () => {
                const { body } = await request(app).post('/api/services').send(exampleService).expect(200);
                expect(body.length).toBeGreaterThan(0);
            });

            it('should fail validation for missing fields', async () => {
                return request(app).post('/api/services').send({}).expect(400);
            });
        });

        describe('PUT /api/services/:id', () => {
            it('should update a service', async () => {
                const { body: services } = await request(app).post('/api/services').send(exampleService).expect(200);
                const serviceId = services[0]._id;
                //const updateBody = { status: false };
                const updateBody = { name: "false" };
                const { body } = await request(app).put(`/api/services/${serviceId}`).send(updateBody).expect(200);
                expect(body.some(s => s.name === "false")).toBeTruthy();
            });
        });

        describe('DELETE /api/services/:id', () => {
            it('should delete a service', async () => {
                const { body: services } = await request(app).post('/api/services').send(exampleService).expect(200);
                const serviceId = services[0]._id;
                await request(app).delete(`/api/services/${serviceId}`).expect(200);
                const { body } = await request(app).get('/api/services').expect(200);
                expect(body.length).toBe(0);
            });
        });
    });
});
