'use strict';

const protoFilePath = __dirname + '/../../protos/system.proto';
const packageName = 'System';
const serviceName = 'SystemSrv';

module.exports = app => {

  const address = app.config.grpc.address.system;
  const client = require('../grpcLoader')(protoFilePath, packageName, serviceName, address);

  return class SystemService extends app.Service {

    async call(method, param = {}){
      return new Promise(function(resolve, reject){
        client[method](param, function(error, feature){
          if(error){
            reject(error)
          }else{
            resolve(feature)
          }
        });
      })
    }

    // menu
    async getAllMenus() {
      return this.call('GetAllMenus')
    }
  
    // role
    async getAllRoles() {
      return this.call('GetAllRoles')
    }
  
    async getRoleById(id) {
      return this.call('getRoleById', { Body: id })
    }

    async createRole(role) {
      return this.call('CreateRole', role)
    }
  
    async deleteRoleById(id) {
      const res = this.call('DeleteRoleById', { Body: id })
      return res.Body
    }
  
    async updateRole(role) {
      const res = await this.call('UpdateRole', role)
      return res.Body
    }
  
    async getRolePermissions(roleId) {
      return this.call('GetRolePermissions', { Body: roleId })
    }
  
    async updateRolePermissions({RoleId, PermissionCodes}) {
      const res = await this.call('UpdateRolePermissions', { RoleId: RoleId, PermissionCodes: PermissionCodes })
      return res.Body
    }
  
    // user
    async getUserByUsername(username) {
      return this.call('GetUserByUsername', { Username: username })
    }
  
    async getUsers(pageIndex = 1, pageSize = 20) {
      return this.call('GetUsers', { PageIndex: pageIndex, PageSize: pageSize })
    }
  
    async getUserById(userId) {
      return this.call('GetUserById', { Body: userId })
    }
  
    async createUser(user) {
      return this.call('CreateUser', user)
    }
  
    async updateUSer(user) {
      return (await this.call('UpdateUSer', user)).Body
    }
  
    async deleteUserById(userId) {
      return (await this.call('DeleteUserById', { Body: userId })).Body
    }
  
    async getRolesByUserId(userId) {
      return this.call('GetRolesByUserId', { Body: userId })
    }
  }
};
