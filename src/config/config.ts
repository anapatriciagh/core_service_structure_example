import dotenv from 'dotenv';

const data = dotenv.config();

if (data.error) {
  throw data.error;
}

const env = data.parsed;

if (!env) {
  throw new ReferenceError();
}

const Config = {
  modules: {
    user_url: 'user_url',
    //servicos externos
  },
  internalCommunication: {
    communication_key: 'communication_key',
    //chaves de columicação interna
  },
};

export default Config;
