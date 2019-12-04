import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },

  redis: {
    enable: true,
    package: 'egg-redis',
  }
};

export default plugin;