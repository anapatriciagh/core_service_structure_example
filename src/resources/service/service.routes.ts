import express from 'express';
import { StorekeeperProtectedRoute } from '../../loaders/protectedRoutes/protectedRoutes';

import ServiceController from './service.controller';

const serviceController = new ServiceController();

const routes = express.Router();

routes.post('/services', StorekeeperProtectedRoute, serviceController.save);
routes.patch('/services/:id', StorekeeperProtectedRoute, serviceController.update);
routes.patch('/services/:id/is-active', StorekeeperProtectedRoute, serviceController.updateIsActive);
routes.delete('/services/:id', serviceController.delete);
routes.get('/services/:id', serviceController.getOne);
routes.get('/services', serviceController.getAll);
routes.get('/storekeepers-services/intern', StorekeeperProtectedRoute, serviceController.getStorekeeperServices);

export default routes;
