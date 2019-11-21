'use strict';

const BaseController = require('./base');
const uuidv1 = require('uuid/v1');
const redis = require('../redisHelper')

class IdentityController extends BaseController {
  async login() {
    const rules = {
      Username: { type: 'string' },
      Password: { type: 'string' }
    }
    this.ctx.validate(rules);
    const model = this.ctx.request.body;
    const user = await this.service.system.getUserByUsername(model.Username);

    if (!user) {
      this.ctx.body = { status: 1, message: '用户名或密码错误' }
    } else {
      const token = uuidv1();
      redis.set(token, user, 10800);
      this.success({
        token: token
      }, "登录成功");
    }
  }

  async logout() {

  }
}

module.exports = IdentityController;
