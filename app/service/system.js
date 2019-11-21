'use strict';

const protoFilePath = __dirname + '/../../../../../Services/protos/system.proto';
const packageName = 'System';
const serviceName = 'SystemSrv';
const address = '127.0.0.1:80054';
const client = require('../grpcLoader')(protoFilePath, packageName, serviceName, address);

const Service = require('egg').Service;

class SystemService extends Service {
  async getAllMenus() {
    return new Promise(function(resolve, reject){
      client.GetAllMenus({}, function(error, feature){
        if(error){
          reject(error)
        }else{
          resolve(feature)
        }
      });
    })
  }

  async getAllRoles() {
    return new Promise(function(resolve, reject){
      client.GetAllRoles({}, function(error, feature){
        if(error){
          reject(error)
        }else{
          resolve(feature)
        }
      });
    })
  }

  async getRoleById(id) {
    return new Promise(function(resolve, reject){
      client.GetRoleById({ Body: id }, function(error, feature){
        if(error){
          reject(error)
        }else{
          resolve(feature)
        }
      });
    })
  }

  async createRole(role) {
    return new Promise(function(resolve, reject){
      client.CreateRole(role, function(error, feature){
        if(error){
          reject(error)
        }else{
          resolve(feature)
        }
      });
    })
  }

  async deleteRoleById(id) {
    return new Promise(function(resolve, reject){
      client.DeleteRoleById({ Body: id }, function(error, feature){
        if(error){
          console.log(error)
          resolve(false)
        }else{
          resolve(feature.Body)
        }
      });
    })
  }

  async updateRole(role) {
    return new Promise(function(resolve, reject){
      client.UpdateRole(role, function(error, feature){
        if(error){
          console.log(error)
          resolve(false)
        }else{
          resolve(feature.Body)
        }
      });
    })
  }

  async getRolePermissions(roleId) {
    return new Promise(function(resolve, reject){
      client.GetRolePermissions({ Body: roleId }, function(error, feature){
        if(error){
          reject(error)
        }else{
          resolve(feature)
        }
      });
    })
  }

  async updateRolePermissions({RoleId, PermissionCodes}) {
    return new Promise(function(resolve, reject){
      client.UpdateRolePermissions({ RoleId: RoleId, PermissionCodes: PermissionCodes }, function(error, feature){
        if(error){
          console.log(error)
          resolve(false)
        }else{
          resolve(feature.Body)
        }
      });
    })
  }

  async getUserByUsername(username) {
    return new Promise(function(resolve, reject){
      client.GetUserByUsername({ Username: username }, function(error, feature){
        if(error){
          console.log(error)
          resolve(null)
        }else{
          resolve(feature)
        }
      });
    })
  }

  async getUsers(pageIndex = 1, pageSize = 20) {
    return new Promise(function(resolve, reject){
      client.GetUsers({ PageIndex: pageIndex, PageSize: pageSize }, function(error, feature){
        if(error){
          console.log(error)
          resolve(null)
        }else{
          resolve(feature)
        }
      });
    })
  }

  async getUserById(userId) {
    return new Promise(function(resolve, reject){
      client.GetUserById({ Body: userId }, function(error, feature){
        if(error){
          console.log(error)
          resolve(null)
        }else{
          resolve(feature)
        }
      });
    })
  }

  async createUser(user) {
    return new Promise(function(resolve, reject){
      client.CreateUser(user, function(error, feature){
        if(error){
          console.log(error)
          resolve(null)
        }else{
          resolve(feature)
        }
      });
    })
  }

  async updateUSer(user) {
    return new Promise(function(resolve, reject){
      client.UpdateUSer(user, function(error, feature){
        if(error){
          console.log(error)
          resolve(false)
        }else{
          resolve(feature.Body)
        }
      });
    })
  }

  async deleteUserById(userId) {
    return new Promise(function(resolve, reject){
      client.DeleteUserById({ Body: userId }, function(error, feature){
        if(error){
          console.log(error)
          resolve(false)
        }else{
          resolve(feature.Body)
        }
      });
    })
  }

}

module.exports = SystemService;
