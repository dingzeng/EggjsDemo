'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  
  const { router, controller } = app;
  
  // test
  router.get('/test', controller.test.test)

  // identity
  router.post('/login', controller.identity.login)
  router.post('/logout', controller.identity.logout)

  // modules
  require('./router/archive')(app);
  require('./router/purchase')(app);
  require('./router/stock')(app);
  require('./router/system')(app);
};
