import { Express } from 'express';

import '../container';
import loadDatabase from './database/database';
import expressConfig from './express/express';

const loadConfigsAndConnections = async (app: Express): Promise<void> => {
  await loadDatabase(app);

  app.on('database-ready', async () => {
    await expressConfig(app);
  });
};

export default loadConfigsAndConnections;
