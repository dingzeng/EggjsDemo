import {
    Menu
} from '../model/module'
import BaseController from './base'

/**
 * 系统管理控制器
 */
export default class SystemController extends BaseController {

    public async getMenus() {
        let menus: Array<Menu> = await this.service.system.getAllMenus();
        this.success(menus);
    }

    public async getAllRoles() {
        let response = await this.service.system.getAllRoles();
        this.success(response);
    }

    public async getRole() {
        const id = this.ctx.params.id;
        const role = await this.service.system.getRoleById(id);
        this.success(role);
    }

    public async createRole() {
        const rules = {
            name: { type: 'string' },
            memo: 'string?'
        };
        this.ctx.validate(rules);
        const model = this.ctx.request.body;
        const role = await this.service.system.createRole(model);
        this.success(role, '角色创建成功');
    }

    public async updateRole() {
        const rules = {
            id: { type: 'int' },
            name: { type: 'string' },
            memo: 'string?'
        };
        const errors = this.app.validator.validate(rules, this.ctx.request.body);
        if (errors) {
            this.validationFailed(errors);
            return;
        }

        const model = this.ctx.request.body;
        const success = await this.service.system.updateRole(model);

        success ? this.success() : this.failed();
    }

    public async deleteRole() {
        const id = this.ctx.params.id;
        const success = await this.service.system.deleteRoleById(id);

        success ? this.success() : this.failed();
    }

    public async getRolePermissions() {
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
    public async updateRolePermissions() {
        const rules = {
            roleId: 'id',
            permissionCodes: { type: 'array', itemType: 'string', min: 1 }
        }
        const errors = this.app.validator.validate(rules, this.ctx.request.body);
        if (errors) {
            this.validationFailed(errors);
            return;
        }

        let roleId: number = this.ctx.request.body.roleId;
        let permissionCodes: Array<string> = this.ctx.request.body.permissionCodes
        const success = await this.service.system.updateRolePermissions(roleId, permissionCodes);

        success ? this.success() : this.failed();
    }

    public async getUsers() {
        const { query } = this.ctx;
        const rules = {
            pageIndex: { type: 'int', min: 1, convertType: 'int' },
            pageSize: { type: 'int', convertType: 'int' }
        }
        const errors = this.app.validator.validate(rules, query);
        if (errors) {
            this.validationFailed(errors);
            return;
        }

        const pagingResult = await this.service.system.getUsers(query.pageIndex, query.pageSize);
        this.success(pagingResult);
    }

    public async getUser() {
        const id = this.ctx.params.id;
        const user = await this.service.system.getUserById(id);
        const userRoles = await this.service.system.getRolesByUserId(id);
        const response = Object.assign({}, user, { roles: userRoles.map(r => r.id) })
        this.success(response);
    }

    public async getUserPage() {
        this.success({
            roles: await this.service.system.getAllRoles()
        })
    }

    public async createUser() {
        const rules = {
            branchCode: 'string',
            username: 'string',
            password: 'string',
            name: 'string',
            mobile: 'string?',
            roles: {
                type: 'array', itemType: 'int'
            }
        }
        const model = this.ctx.request.body;
        const errors = this.app.validator.validate(rules, model);
        if (errors) {
            this.validationFailed(errors);
            return;
        }
        const user = await this.service.system.createUser(model);
        await this.service.system.updateUserRoles(user.id, model.roles);

        this.success(user);
    }

    public async updateUser() {
        const rules = {
            id: 'id',
            branchId: 'string',
            username: 'string',
            password: 'string',
            name: 'string',
            mobile: 'string?',
            roles: {
                type: 'array', itemType: 'int'
            }
        }
        const model = this.ctx.request.body;
        const errors = this.app.validator.validate(rules, model);
        if (errors) {
            this.validationFailed(errors);
            return;
        }
        var user = await this.service.system.getUserById(model.id);
        if (!user) {
            this.failed('用户不存在');
            return;
        }
        Object.assign(user, model);
        const success = await this.service.system.updateUser(user);
        await this.service.system.updateUserRoles(user.id, model.roles);
        if (!success) {
            this.failed()
        }
        this.success(user);
    }

    public async updateUserPermission() {
        const rules = {
            id: 'id',
            itemDepartmentPermissionFlag: 'bool',
            supplierPermissionFlag: 'bool'
        }
        const model = this.ctx.request.body;
        const errors = this.app.validator.validate(rules, model);
        if (errors) {
            this.validationFailed(errors);
            return;
        }
        var user = await this.service.system.getUserById(model.id);
        if (!user) {
            this.failed('用户不存在');
            return;
        }
        Object.assign(user, model);
        const success = await this.service.system.updateUser(user);
        if (!success) {
            this.failed();
        }
        this.success(user);
    }

    public async updateUserPassword() {
        const rules = {
            id: 'id',
            password: 'string'
        }
        const model = this.ctx.request.body;
        const errors = this.app.validator.validate(rules, model);
        if (errors) {
            this.validationFailed(errors);
            return;
        }
        var user = await this.service.system.getUserById(model.id);
        if (!user) {
            this.failed('用户不存在');
            return;
        }
        Object.assign(user, model);
        await this.service.system.updateUser(user);
        this.success(user);
    }

    public async deleteUser() {
        const id = this.ctx.params.id;
        const success = await this.service.system.deleteUserById(id);

        success ? this.success() : this.failed();
    }
}
