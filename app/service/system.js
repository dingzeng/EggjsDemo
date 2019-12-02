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
      return client.call('getRoleById', { Body: id })
    }

    async createRole(role) {
      return client.call('CreateRole', role)
    }

    async deleteRoleById(id) {
      const res = await client.call('DeleteRoleById', { Body: id })
      return res.Body
    }

    async updateRole(role) {
      const res = await client.call('UpdateRole', role)
      return res.Body
    }

    async getRolePermissions(roleId) {
      return client.call('GetRolePermissions', { Body: roleId })
    }

    async updateRolePermissions({ RoleId, PermissionCodes }) {
      const res = await client.call('UpdateRolePermissions', { RoleId: RoleId, PermissionCodes: PermissionCodes })
      return res.Body
    }

    // user
    async getUserByUsername(username) {
      return client.call('GetUserByUsername', { Username: username })
    }

    async getUsers(pageIndex = 1, pageSize = 20) {
      return client.call('GetUsers', { PageIndex: pageIndex, PageSize: pageSize })
    }

    async getUserById(userId) {
      return client.call('GetUserById', { Body: userId })
    }

    async createUser(user) {
      return client.call('CreateUser', user)
    }

    async updateUSer(user) {
      return (await client.call('UpdateUSer', user)).Body
    }

    async deleteUserById(userId) {
      return (await client.call('DeleteUserById', { Body: userId })).Body
    }

    async getRolesByUserId(userId) {
      return client.call('GetRolesByUserId', { Body: userId })
    }

    async getUserMenus(userId) {
      return (await client.call('GetUserMenus', { Body: userId })).Nodes
    }

    async getUserPermissions(userId) {
      return (await client.call('GetUserPermissions', { Body: userId })).Permissions
    }
  }
};
