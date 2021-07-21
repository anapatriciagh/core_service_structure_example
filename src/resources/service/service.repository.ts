import { Repository, ILike, getRepository, EntityRepository } from 'typeorm';

import Service from './service.model';
import {
  IServiceRepository,
  IRepositoryCreateServiceDTO,
  IRepositoryUpdateServiceDTO,
} from './interfaces/repository.interface';
import { IPagination } from '../utils/pagination';

@EntityRepository(Service)
export default class ServiceRepository implements IServiceRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async create(serviceData: IRepositoryCreateServiceDTO): Promise<Service> {
    try {
      const service = await this.ormRepository.create(serviceData);

      await this.ormRepository.save(service);

      return service;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async update(serviceId: string, serviceData: IRepositoryUpdateServiceDTO): Promise<number | undefined> {
    try {
      const serviceUpdated = await this.ormRepository.update({ id: serviceId }, serviceData);

      return serviceUpdated?.affected;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateIsActive(serviceId: string, isActive: boolean): Promise<number | undefined> {
    try {
      const serviceUpdated = await this.ormRepository.update({ id: serviceId }, { is_active: isActive });

      return serviceUpdated?.affected;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async destroy(serviceId: string): Promise<number | undefined | null> {
    try {
      const deleteResult = await this.ormRepository.delete({ id: serviceId });

      return deleteResult?.affected;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOne(serviceId: string): Promise<Service | undefined> {
    try {
      const data = await this.ormRepository.find({
        where: {
          id: serviceId,
        },
        relations: [
          'serviceType',
          'serviceType.category',
          'serviceVariations',
          'serviceVariations.animalCharacteristic',
          'serviceVariations.animalCharacteristic.race',
          'serviceVariations.animalCharacteristic.race.animalType',
        ],
      });
      return data[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOneWithVariations(serviceId: string): Promise<Service | undefined> {
    try {
      const data = await this.ormRepository.find({
        where: {
          id: serviceId,
        },
        relations: ['serviceType', 'serviceType.category', 'serviceVariations'],
      });
      return data[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findSimpleOne(serviceId: string): Promise<Service | undefined> {
    try {
      return await this.ormRepository.findOne(serviceId);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async find(): Promise<Service[]> {
    try {
      return await this.ormRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOneByDescriptionAndServiceTypeId(
    serviceDescription: string,
    serviceTypeId: string,
  ): Promise<Service | undefined> {
    try {
      const service = await this.ormRepository.findOne({
        where: {
          description: ILike(`%${serviceDescription}%`),
          service_type_id: serviceTypeId,
        },
      });

      return service;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOneByIdAndStorekeeperId(serviceId: string, storekeeperId: string): Promise<Service | undefined> {
    try {
      const service = await this.ormRepository.findOne({
        where: {
          id: serviceId,
          storekeeper_id: storekeeperId,
        },
      });
      return service;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findAllByStorekeeperId(storekeeperId: string, pagination: IPagination): Promise<[Service[], number]> {
    try {
      const services = await this.ormRepository.findAndCount({
        where: {
          storekeeper_id: storekeeperId,
        },
        relations: [
          'serviceType',
          'serviceType.category',
          'serviceVariations',
          'serviceVariations.animalCharacteristic',
          'serviceVariations.animalCharacteristic.race',
          'serviceVariations.animalCharacteristic.race.animalType',
        ],
        skip: pagination.offset,
        take: pagination.limit,
      });
      return services;
    } catch (error) {
      throw new Error(error);
    }
  }
}
