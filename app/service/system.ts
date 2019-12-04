import { Service } from 'egg';
import grpcLoader from '../grpcLoader';

const protoFilePath = __dirname + '/../../protos/system.proto';
const packageName = 'System';
const serviceName = 'SystemSrv';

export default app => {

  const address = app.config.grpc.address.system;
  const client = grpcLoader(protoFilePath, packageName, serviceName, address);

  return class SystemService extends Service {

    // menu
    public async getAllMenus() {
      return client.call('GetAllMenus')
    }

    // role
    public async getAllRoles() {
      return client.call('GetAllRoles')
    }

    public async getRoleById(id: string) {
      return client.call('getRoleById', { body: id })
    }

    public async createRole(role) {
      return client.call('CreateRole', role)
    }

    public async deleteRoleById(id) {
      const res = await client.call('DeleteRoleById', { body: id })
      return res.body
    }

    public async updateRole(role) {
      const res = await client.call('UpdateRole', role)
      return res.body
    }

    public async getRolePermissions(roleId) {
      return client.call('GetRolePermissions', { body: roleId })
    }

    public async updateRolePermissions({ roleId, permissionCodes }) {
      const res = await client.call('UpdateRolePermissions', { roleId, permissionCodes })
      return res.body
    }

    // user
    public async getUserByUsername(username: string) {
      return client.call('GetUserByUsername', { username })
    }

    public async getUsers(pageIndex = 1, pageSize = 20) {
      return client.call('GetUsers', { pageIndex, pageSize })
    }

    public async getUserById(userId) {
      return client.call('GetUserById', { body: userId })
    }

    public async createUser(user) {
      return client.call('CreateUser', user)
    }

    public async updateUSer(user) {
      return (await client.call('UpdateUSer', user)).body
    }

    public async deleteUserById(userId) {
      return (await client.call('DeleteUserById', { body: userId })).body
    }

    public async getRolesByUserId(userId) {
      return client.call('GetRolesByUserId', { body: userId })
    }

    public async getUserMenus(userId) {
      const response = await client.call('GetUserMenus', { body: userId })
      return response.nodes
    }

    public async getUserPermissions(userId) {
      const response = await client.call('GetUserPermissions', { body: userId });
      return response.permissions
    }
  }
};
