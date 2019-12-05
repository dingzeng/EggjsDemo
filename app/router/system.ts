import { Application } from 'egg';

export default (app: Application) => {
    const { router, controller } = app;

    // menu
    router.get('/system/menus', controller.system.getMenus)

    // role
    router.get('/system/roles', controller.system.getAllRoles);
    router.get('/system/role/:id', controller.system.getRole);
    router.post('/system/role', controller.system.createRole);
    router.put('/system/role', controller.system.updateRole);
    router.del('/system/role/:id', controller.system.deleteRole);
    router.get('/system/role/:roleId/permissions', controller.system.getRolePermissions);
    router.put('/system/role/:roleId/permissions', controller.system.updateRolePermissions);

    // user
    router.get('/system/users', controller.system.getUsers)
    router.get('/system/user/_page', controller.system.getUserPage) // NOTE: _page路由需要在获取单个资源的路由的前面
    router.get('/system/user/:id', controller.system.getUser)
    router.post('/system/user', controller.system.createUser)
    router.put('/system/user', controller.system.updateUser)
    router.put('/system/user/permission', controller.system.updateUserPermission)
    router.put('/system/user/password', controller.system.updateUserPassword)
    router.del('/system/user/:id', controller.system.deleteUser)
}