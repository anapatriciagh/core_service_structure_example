import { container } from 'tsyringe';

// ServiceRepository
import { IServiceRepository } from '../../resources/service/interfaces/repository.interface';
import { IServiceService } from '../../resources/service/interfaces/service.interface';
import ServiceRepository from '../../resources/service/service.repository';
import ServiceService from '../../resources/service/service.service';

container.registerSingleton<IServiceRepository>('ServiceRepository', ServiceRepository);

container.registerSingleton<IServiceService>('ServiceService', ServiceService);
