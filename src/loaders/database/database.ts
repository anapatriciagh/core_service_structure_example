import { Express } from 'express';
import databaseConnection from '../../database/database';

const loadDatabase = async (app: Express): Promise<void> => {
  try {
    await databaseConnection(app);
  } catch (error) {
    console.log(error);
  }
};

export default loadDatabase;
