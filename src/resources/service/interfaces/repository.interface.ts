import Service from '../service.model';

interface IRepositoryCreateService {
}

interface IRepositoryUpdateService {
}

interface IServiceRepository {
  create(serviceData: IRepositoryCreateService): Promise<Service>;
  update(serviceId: string, serviceData: IRepositoryUpdateService): Promise<number | undefined>;
  destroy(serviceId: string): Promise<number | undefined | null>;
  findOne(serviceId: string): Promise<Service | undefined>;
  find(): Promise<Service[]>;
}

export { IServiceRepository, IRepositoryCreateService, IRepositoryUpdateService };
