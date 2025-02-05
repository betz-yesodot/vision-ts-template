import mongoose from 'mongoose';
import { config } from '../../config.js';
import { ServiceDocument } from './interface.js';

const ServiceSchema = new mongoose.Schema<ServiceDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
    }

);

export const ServiceModel = mongoose.model<ServiceDocument>(config.mongo.servicesCollectionName, ServiceSchema);
