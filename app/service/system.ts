import { Context, Service } from 'egg';
import grpcLoader from '../grpcLoader';

const protoFilePath = __dirname + '/../../protos/system.proto';
const packageName = 'System';
const serviceName = 'SystemSrv';

export default class SystemService extends Service {

  client: any;
  constructor(ctx: Context) {
    super(ctx)
    let address = ctx.app.config.grpc.address.system;
    this.client = grpcLoader(protoFilePath, packageName, serviceName, address);
  }

  // menu
  public async getAllMenus(): Promise<Array<Menu>> {
    return this.client.call('GetAllMenus')
  }

  // role
  public async getAllRoles(): Promise<Array<Role>> {
    let response = await this.client.call('GetAllRoles')
    return response.roles
  }

  public async getRoleById(id: number): Promise<Role> {
    let response = await this.client.call('getRoleById', { body: id })
    return response
  }

  public async createRole(role: Role): Promise<Role> {
    return this.client.call('CreateRole', role)
  }

  public async deleteRoleById(id: number): Promise<boolean> {
    const res = await this.client.call('DeleteRoleById', { body: id })
    return res.body
  }

  public async updateRole(role: Role): Promise<boolean> {
    const res = await this.client.call('UpdateRole', role)
    return res.body
  }

  public async getRolePermissions(roleId: number): Promise<Array<Permission>> {
    return this.client.call('GetRolePermissions', { body: roleId })
  }

  public async updateRolePermissions(roleId: number, permissionCodes: Array<string>): Promise<boolean> {
    const res = await this.client.call('UpdateRolePermissions', { roleId, permissionCodes })
    return res.body
  }

  // user
  public async getUserByUsername(username: string): Promise<User> {
    return this.client.call('GetUserByUsername', { username })
  }

  /**
   * 获取用户分页
   * @param pageIndex 页码
   * @param pageSize 页大小
   */
  public async getUsers(pageIndex: number = 1, pageSize: number = 20): Promise<Paged<User>> {
    let response = await this.client.call('GetUsers', { pageIndex, pageSize })
    return new Paged<User>(response.users, response.totalCount)
  }


  public async getUserById(userId: number): Promise<User> {
    return this.client.call('GetUserById', { body: userId })
  }

  public async createUser(user: User): Promise<User> {
    return this.client.call('CreateUser', user)
  }

  public async updateUserInfo(user: User): Promise<boolean> {
    let response = await this.client.call('UpdateUserInfo', user)
    return response.body
  }

  public async deleteUserById(userId: number): Promise<boolean> {
    let response = await this.client.call('DeleteUserById', { body: userId })
    return response.body
  }

  public async getRolesByUserId(userId: number): Promise<Array<Role>> {
    let response = this.client.call('GetRolesByUserId', { body: userId })
    return response.roles
  }

  public async getUserMenus(userId: number): Promise<Array<MenuNode>> {
    const response = await this.client.call('GetUserMenus', { body: userId })
    return response.nodes
  }

  public async getUserPermissions(userId: number): Promise<Array<Permission>> {
    const response = await this.client.call('GetUserPermissions', { body: userId });
    return response.permissions
  }
}
