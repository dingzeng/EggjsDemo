import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;
  config.keys = appInfo.name + '_1572964087660_9537';

  // add your middleware config here
  config.middleware = ['auth'];

  config.auth = {
    ignore: '.'
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      ignore: () => true
    }
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '0.0.0.0',
    }
  };

  // required in config.[env].js
  config.redis = {
    client: {
      port: 6379,
      host: 'localhost',
      password: '',
      db: 0,
    }
  };

  // required in config.[env].js
  config.grpc = {
    address: {
      archive: 'localhost:8051',
      purchase: 'localhost:8052',
      stock: 'localhost:8053',
      system: 'localhost:8054',
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
