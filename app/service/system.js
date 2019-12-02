'use strict';

const protoFilePath = __dirname + '/../../protos/system.proto';
const packageName = 'System';
const serviceName = 'SystemSrv';

module.exports = app => {

  const address = app.config.grpc.address.system;
  const client = require('../grpcLoader')(protoFilePath, packageName, serviceName, address);

  return class SystemService extends app.Service {

    // menu
    async getAllMenus() {
      return client.call('GetAllMenus')
    }

    // role
    async getAllRoles() {
      return client.call('GetAllRoles')
    }

    async getRoleById(id) {
      return client.call('getRoleById', { body: id })
    }

    async createRole(role) {
      return client.call('CreateRole', role)
    }

    async deleteRoleById(id) {
      const res = await client.call('DeleteRoleById', { body: id })
      return res.body
    }

    async updateRole(role) {
      const res = await client.call('UpdateRole', role)
      return res.body
    }

    async getRolePermissions(roleId) {
      return client.call('GetRolePermissions', { body: roleId })
    }

    async updateRolePermissions({ roleId, permissionCodes }) {
      const res = await client.call('UpdateRolePermissions', { roleId, permissionCodes })
      return res.body
    }

    // user
    async getUserByUsername(username) {
      return client.call('GetUserByUsername', { username })
    }

    async getUsers(pageIndex = 1, pageSize = 20) {
      return client.call('GetUsers', { pageIndex, pageSize })
    }

    async getUserById(userId) {
      return client.call('GetUserById', { body: userId })
    }

    async createUser(user) {
      return client.call('CreateUser', user)
    }

    async updateUSer(user) {
      return (await client.call('UpdateUSer', user)).body
    }

    async deleteUserById(userId) {
      return (await client.call('DeleteUserById', { body: userId })).body
    }

    async getRolesByUserId(userId) {
      return client.call('GetRolesByUserId', { body: userId })
    }

    async getUserMenus(userId) {
      const response = await client.call('GetUserMenus', { body: userId })
      return response.nodes
    }

    async getUserPermissions(userId) {
      const response = await client.call('GetUserPermissions', { body: userId });
      return response.permissions
    }
  }
};
