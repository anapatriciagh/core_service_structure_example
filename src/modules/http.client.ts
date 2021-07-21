import axios from 'axios';
import config from '../config/config';

const headers = {
  'Content-Type': 'application/json',
  serviceHash: config.internalCommunication.communication_key,
};

const UserService = axios.create({
  baseURL: config.modules.user_url,
  headers,
});

export { UserService };
