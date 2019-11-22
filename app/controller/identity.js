'use strict';

const BaseController = require('./base');
const uuidv1 = require('uuid/v1');

class IdentityController extends BaseController {
  async login() {
    const rules = {
      username: { type: 'string' },
      password: { type: 'string' }
    }
    this.ctx.validate(rules);
    const model = this.ctx.request.body;
    const user = await this.service.system.getUserByUsername(model.username);
    
    if (!user || model.password != user.Password) {
      this.failed("用户名或密码错误");
    } else {
      const roles = await this.service.system.getRolesByUserId(user.Id)
      const token = uuidv1();
      const userinfo = {
        roles: roles.map(r => r.Id),
        name: user.Name,
        avatar: '',
        introduction: ''
      }
      await this.app.redis.set(token, userinfo, 10800);
      this.success({
        token: token
      }, "登录成功");
    }
  }

  async userinfo(){
    const token = this.ctx.request.query.token;
    const cache = await this.app.redis.get(token);
    var userinfo = null;
    if(cache){
      userinfo = JSON.parse(cache)
    }
    
    this.success(userinfo)
  }

  async logout() {

  }
}

module.exports = IdentityController;
