'use strict';

const BaseController = require('./base');

class SystemController extends BaseController {
    async getMenus() {
        const menus = await this.service.system.getAllMenus();
        this.success(menus);
    }

    async getAllRoles() {
        const roles = await this.service.system.getAllRoles();
        this.success(roles);
    }
  
    async getRole() {
        const id = this.ctx.params.id;
        const role = await this.service.system.getRoleById(id);
        this.success(role);
    }
  
    async createRole() {
        const rules = {
            Name: { type: 'string' }
        };
        this.ctx.validate(rules);
        const model = this.ctx.request.body;
        const role = await this.service.system.createRole(model);
        this.success(role, '角色创建成功');
    }
  
    async updateRole() {
        const rules = {
            Id: { type: 'id' },
            Name: { type: 'string' }
        };
        const errors = this.app.validator.validate(rules, this.ctx.request.body);
        if(errors){
            this.validationFailed(errors);
            return;
        }

        const model = this.ctx.request.body;
        const success = await this.service.system.updateRole(model);

        success ? this.success() : this.failed();
    }
  
    async deleteRole() {
        const id = this.ctx.params.id;
        const success = await this.service.system.deleteRoleById(id);

        success ? this.success() : this.failed();
    }
  
    async getRolePermissions() {
        const roleId = this.ctx.params.roleId;
        const permissions = await this.service.system.getRolePermissions(roleId);
        this.success(permissions);
    }
  
    /**
     * remark:
     *  PUT: /system/role/:roleId/permissions
     *  [角色权限]也可以看成一种"资源",考虑到实际操作一般都是整个集合提交，这里的修改操作只简单的进行集合修改,也可以更细粒度的拆分为添加和删除关系的API，如：
     *  添加角色权限：POST /system/role/:roleId/permission
     *  删除角色权限：DELETE /system/role/:roleId/permission/:permissionCode
     */
    async updateRolePermissions() {
        const rules = {
            RoleId: 'id',
            PermissionCodes: { type: 'array', itemType: 'string', min: 1 }
        }
        const errors = this.app.validator.validate(rules, this.ctx.request.body);
        if(errors){
            this.validationFailed(errors);
            return;
        }

        const model = this.ctx.request.body;
        const success = await this.service.system.updateRolePermissions(model);

        success ? this.success() : this.failed();
    }

    async getUsers() {
        const { query } = this.ctx;
        const rules = {
            pageIndex: { type: 'int', min: 1, convertType: 'int' },
            pageSize: { type: 'int', convertType: 'int' }
        }
        const errors = this.app.validator.validate(rules, query);
        if(errors){
            this.validationFailed(errors);
            return;
        }

        const pagingResult = await this.service.system.getUsers(query.pageIndex, query.pageSize);
        this.success({
            totalCount: pagingResult.TotalCount,
            list: pagingResult.Users
        });
    }
  
    async getUser() {
        const id = this.ctx.params.id;
        const user = await this.service.system.getUserById(id);
        this.success(user);
    }
  
    async createUser() {
        const rules = {
            BranchCode: 'string',
            Username: 'string',
            Password: 'string',
            Name: 'string',
            Mobile: { type: 'string', required: false }
        }
        const model = this.ctx.request.body;
        const errors = this.app.validator.validate(rules, model);
        if(errors){
            this.validationFailed(errors);
            return;
        }
        const user = await this.service.system.createUser(model);
        this.success(user);
    }
  
    async updateUserInfo() {
        const rules = {
            id: 'id',
            branchCode: 'string',
            username: 'string',
            password: 'string',
            name: 'string',
            mobile: { type: 'string', required: false }
        }
        const model = this.ctx.request.body;
        const errors = this.app.validator.validate(rules, model);
        if(errors){
            this.validationFailed(errors);
            return;
        }
        var user = await this.service.system.getUserById(model.id);
        if(!user){
            this.failed('用户不存在');
            return;
        }
        Object.assign(user, model);
        user = await this.service.system.updateUserInfo(user);
        this.success(user);
    }
  
    async updateUserPermission() {
        const rules = {
            id: 'id',
            itemDepartmentPermissionFlag: 'bool',
            supplierPermissionFlag: 'bool'
        }
        const model = this.ctx.request.body;
        const errors = this.app.validator.validate(rules, model);
        if(errors){
            this.validationFailed(errors);
            return;
        }
        var user = await this.service.system.getUserById(model.id);
        if(!user){
            this.failed('用户不存在');
            return;
        }
        Object.assign(user, model);
        user = await this.service.system.updateUserInfo(user);
        this.success(user);
    }
  
    async updateUserRoles() {
      
    }
  
    async updateUserPassword() {
        const rules = {
            id: 'id',
            password: 'string'
        }
        const model = this.ctx.request.body;
        const errors = this.app.validator.validate(rules, model);
        if(errors){
            this.validationFailed(errors);
            return;
        }
        var user = await this.service.system.getUserById(model.id);
        if(!user){
            this.failed('用户不存在');
            return;
        }
        Object.assign(user, model);
        user = await this.service.system.updateUserInfo(user);
        this.success(user);
    }

    async deleteUser() {
        const id = this.ctx.params.id;
        const success = await this.service.system.deleteUserById(id);

        success ? this.success() : this.failed();
    }
}

module.exports = SystemController;
