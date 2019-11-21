'use strict';

const BaseController = require('./base');

const redis = require('../redisHelper');

class TestController extends BaseController {
  async test() {
    this.ctx.body = await redis.get('testkey');
  }
}

module.exports = TestController;
