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
      const menus = await this.service.system.getUserMenus(user.Id)
      var menuTree = menus.filter(m => !m.ParentCode)
      this.convertMenusToTree(menuTree, menus)
      const permissions = await this.service.system.getUserPermissions(user.Id)

      const token = uuidv1();
      const userinfo = {
        menus: menuTree,
        permissions: permissions,
        name: user.Name,
        avatar: '',
        introduction: ''
      }
      await this.app.redis.set(token, JSON.stringify(userinfo));
      this.success({
        token: token
      }, "登录成功");
    }
  }

  convertMenusToTree(menuTree, menus) {
    menuTree.forEach(node => {
      node.children = menus.filter(m => m.ParentCode == node.Code)
      this.convertMenusToTree(node.children, menus)
    });
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
