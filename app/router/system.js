'use strict';

module.exports = app => {
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
    router.get('/system/user/:id', controller.system.getUser)
    router.post('/system/user', controller.system.createUser)
    router.put('/system/user/info', controller.system.updateUserInfo)
    router.put('/system/user/permission', controller.system.updateUserPermission)
    router.put('/system/user/roles', controller.system.updateUserRoles)
    router.put('/system/user/password', controller.system.updateUserPassword)
    router.del('/system/user/:id', controller.system.deleteUser)
}