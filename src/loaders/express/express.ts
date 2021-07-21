import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import status from 'http-status';

import version from '../../version';
import routes from '../../startup/routes';

const loadExpressConfig = async (app: Express): Promise<void> => {
  app.use(cors());

  // Server config
  app.use(express.json());

  // Import routes
  app.use('/api', routes);

  // Status route
  app.get('/', (request: Request, response: Response) => {
    return response.status(status.OK).json({ result: `service is up! v${version}` });
  });
};

export default loadExpressConfig;
