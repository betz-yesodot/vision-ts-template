import { DocumentNotFoundError } from '../../utils/errors.js';
import { Service, ServiceDocument } from './interface.js';
import { ServiceModel } from './model.js';

export class ServicesManager {
    static getAllQuery = async (): Promise<ServiceDocument[]> => {
        return await getAllServices()
    };

    static createOne = async (Service: Service): Promise<ServiceDocument[]> => {
        await ServiceModel.create(Service);
        return await getAllServices()
    };

    static updateOne = async (ServiceId: string, service: Partial<Service>): Promise<ServiceDocument[]> => {
        await ServiceModel.findByIdAndUpdate(ServiceId, service, { new: true }).orFail(new DocumentNotFoundError(ServiceId)).lean().exec();
        return await getAllServices()
    };

    static deleteOne = async (ServiceId: string): Promise<ServiceDocument[]> => {
        await ServiceModel.findByIdAndDelete(ServiceId).orFail(new DocumentNotFoundError(ServiceId)).lean().exec();
        return await getAllServices()
    };
}

const getAllServices = () => {
    return ServiceModel.find({}).lean().exec();
}