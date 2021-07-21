import express from 'express';
import serviceRoutes from '../resources/service/service.routes';

const routes = express.Router();

routes.use(serviceRoutes);

export default routes;
