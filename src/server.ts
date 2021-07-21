import express from 'express';

import loadConfigsAndConnections from './loaders/loader';
import version from './version';

const app = express();

const startServer = async () => {
  await loadConfigsAndConnections(app);

  const port = process.env.PORT || 3006;

  app.on('database-ready', () => {
    app.listen(port, () => {
      console.log(`on: ${port}`);
      console.log(`v${version} / ${new Date()}`);
    });
  });
};

startServer();

export default app;
