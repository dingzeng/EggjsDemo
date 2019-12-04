import { MenuNode, Permission } from '../model/module'
import BaseController from './base'
const uuidv1 = require('uuid/v1');

/**
 * 用户会话信息
 */
class UserSessionInfo {
  /**
   * 用户有【查看】权限的菜单集合
   */
  menus: Array<MenuNode>;

  /**
   * 用户拥有的操作权限集合
   */
  permissions: Array<Permission>;

  /**
   * 用户姓名
   */
  name: string;

  /**
   * 用户头像
   */
  avatar: string;

  /**
   * 用户介绍
   */
  introduction: string;
}

export default class IdentityController extends BaseController {
  /**
   * 登录
   */
  public async login() {
    const rules = {
      username: { type: 'string' },
      password: { type: 'string' }
    }
    this.ctx.validate(rules);
    const model = this.ctx.request.body;
    const user = await this.service.system.getUserByUsername(model.username);

    if (!user || model.password != user.password) {
      this.failed("用户名或密码错误");
    } else {
      const menus = await this.service.system.getUserMenus(user.id)
      const permissions = await this.service.system.getUserPermissions(user.id)

      const token = uuidv1();
      const info: UserSessionInfo = {
        menus: menus,
        permissions: permissions,
        name: user.name,
        avatar: '',
        introduction: ''
      }
      await this.app.redis.set(token, JSON.stringify(info));
      this.success({
        token: token
      }, "登录成功");
    }
  }

  /**
   * 获取用户登录信息
   */
  public async userinfo() {
    const token = this.ctx.request.query.token;
    const cache = await this.app.redis.get(token);
    if (!cache) {
      this.failed('获取用户信息失败')
      return
    }
    
    let info: UserSessionInfo = JSON.parse(cache)
    this.success(info)
  }

  /**
   * 登出
   */
  public async logout() {
    const rules = {
      token: { type: 'string' }
    }
    this.ctx.validate(rules);
    const model = this.ctx.request.body;

    await this.app.redis.del(model.token);
    this.success();
  }
}
