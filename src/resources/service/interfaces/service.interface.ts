import Service from '../service.model';

interface IServiceSaveService {
}

interface IServiceUpdateService {
}

interface IServiceResultService {
}

interface IServiceService {
  save(serviceData: IServiceSaveService): Promise<IServiceResultService>;

  update(serviceId: string, serviceData: IServiceUpdateService): Promise<Service>;

  delete(serviceId: string): Promise<string>;

  getOne(serviceId: string): Promise<IServiceResultService>;

  getAll(): Promise<Service[]>;
}

export { IServiceService, IServiceSaveService, IServiceUpdateService, IServiceResultService };
