import { Express } from 'express';
import { createConnection } from 'typeorm';

const databaseConnection = async (app: Express): Promise<void> => {
  createConnection()
    .then(() => {
      console.log('Database connection established');

      app.emit('database-ready');
    })
    .catch(error => console.log(`Database connection error: ${error}`));
};

export default databaseConnection;
