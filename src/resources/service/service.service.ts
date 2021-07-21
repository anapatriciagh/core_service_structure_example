import { inject, injectable } from 'tsyringe';
import { IServiceService, IServiceResultService, IServiceUpdateService, IServiceSaveService } from './interfaces/service.interface';
import { IServiceRepository } from './interfaces/repository.interface';
import Service from './service.model';

@injectable()
export default class ServiceService implements IServiceService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,
  ) {}

  public async save(serviceData: IServiceSaveService): Promise<IServiceResultService> {
    const service = await this.serviceRepository.create(serviceData);

    if (!service) {
      throw new Error(); // criar padrão para tratamento de erros conforme o http-status
    }
    return service;
  }

  public async update(serviceId: string, serviceData: IServiceUpdateService): Promise<Service> {
    const service = await this.serviceRepository.findOne(serviceId);

    if (!service) {
      throw new Error();
    }

    const updateResult = await this.serviceRepository.update(service.id, serviceData);

    if (!updateResult || updateResult !== 1) {
      throw new Error();
    }

    const serviceAfterUpdate = await this.serviceRepository.findOne(service.id);

    if (!serviceAfterUpdate) {
      throw new Error();
    }

    return serviceAfterUpdate;
  }

  public async delete(serviceId: string): Promise<string> {
    const service = await this.serviceRepository.findOne(serviceId);

    if (!service) {
      throw new Error();
    }

    const deleteResult = await this.serviceRepository.destroy(service.id);

    if (!deleteResult || deleteResult !== 1) {
      throw new Error();
    }

    return 'successfully deleted';
  }

  async getOne(serviceId: string): Promise<IServiceResultService> {
    const service = await this.serviceRepository.findOne(serviceId);

    if (!service) {
      throw new Error();
    }

    const serviceRes = await this.getOne(service.id);

    return serviceRes;
  }

  public async getAll(): Promise<Service[]> {
    const services = await this.serviceRepository.find();

    if (!services || services.length <= 0) {
      throw new Error();
    }
    return services;
  }
}
