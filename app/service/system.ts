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
  public async getAllMenus() {
    return this.client.call('GetAllMenus')
  }

  // role
  public async getAllRoles() {
    return this.client.call('GetAllRoles')
  }

  public async getRoleById(id: string) {
    return this.client.call('getRoleById', { body: id })
  }

  public async createRole(role) {
    return this.client.call('CreateRole', role)
  }

  public async deleteRoleById(id) {
    const res = await this.client.call('DeleteRoleById', { body: id })
    return res.body
  }

  public async updateRole(role) {
    const res = await this.client.call('UpdateRole', role)
    return res.body
  }

  public async getRolePermissions(roleId) {
    return this.client.call('GetRolePermissions', { body: roleId })
  }

  public async updateRolePermissions({ roleId, permissionCodes }) {
    const res = await this.client.call('UpdateRolePermissions', { roleId, permissionCodes })
    return res.body
  }

  // user
  public async getUserByUsername(username: string): Promise<User> {
    return this.client.call('GetUserByUsername', { username })
  }

  public async getUsers(pageIndex = 1, pageSize = 20) {
    return this.client.call('GetUsers', { pageIndex, pageSize })
  }

  public async getUserById(userId) {
    return this.client.call('GetUserById', { body: userId })
  }

  public async createUser(user) {
    return this.client.call('CreateUser', user)
  }

  public async updateUserInfo(user) {
    return (await this.client.call('UpdateUserInfo', user)).body
  }

  public async deleteUserById(userId) {
    return (await this.client.call('DeleteUserById', { body: userId })).body
  }

  public async getRolesByUserId(userId) {
    return this.client.call('GetRolesByUserId', { body: userId })
  }

  public async getUserMenus(userId: number): Promise<Array<MenuNode>> {
    const response = await this.client.call('GetUserMenus', { body: userId })
    return response.nodes
  }

  public async getUserPermissions(userId) {
    const response = await this.client.call('GetUserPermissions', { body: userId });
    return response.permissions
  }
}
