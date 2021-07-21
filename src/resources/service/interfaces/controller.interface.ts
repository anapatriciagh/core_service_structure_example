import { Request, Response, NextFunction } from 'express';

interface IServiceController {
  save(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
  update(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
  delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
  getOne(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
  getAll(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
}

export { IServiceController };
