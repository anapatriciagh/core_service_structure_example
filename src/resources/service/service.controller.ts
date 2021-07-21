import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { container } from 'tsyringe';

import { IServiceController } from './interfaces/controller.interface';
import ServiceService from './service.service';

export default class serviceController implements IServiceController {
  public async save(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const serviceService = container.resolve(ServiceService);

      const serviceData = { ...request.body, storekeeper_id: request.body.user.id };

      const service = await serviceService.save(serviceData);

      return response.status(httpStatus.OK).json({ result: service, message: httpStatus['200_MESSAGE'] });
    } catch (error) {
      return next(error);
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const serviceId = request.params.id;
      const serviceData = { ...request.body };

      const serviceService = container.resolve(ServiceService);

      const service = await serviceService.update(serviceId, serviceData);

      return response.status(httpStatus.OK).json({ result: service, message: httpStatus['200_MESSAGE'] });
    } catch (error) {
      return next(error);
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const serviceId = request.params.id;

      const serviceService = container.resolve(ServiceService);

      await serviceService.delete(serviceId);

      return response.status(httpStatus.OK).json({ message: httpStatus['200_MESSAGE'] });
    } catch (error) {
      return next(error);
    }
  }

  public async getOne(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const serviceService = container.resolve(ServiceService);
      const serviceId = request.params.id;

      const service = await serviceService.getOne(serviceId);

      return response.status(httpStatus.OK).json({ result: service, message: httpStatus['200_MESSAGE'] });
    } catch (error) {
      return next(error);
    }
  }

  public async getAll(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const serviceService = container.resolve(ServiceService);

      const services = await serviceService.getAll();

      return response.status(httpStatus.OK).json({ result: services, message: httpStatus['200_MESSAGE'] });
    } catch (error) {
      return next(error);
    }
  }
}
