import { Application } from 'egg';
import ArchiveModule from './router/archive'
import SystemModule from './router/system'

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/test', controller.test.hello)

  // identity
  router.post('/login', controller.identity.login)
  router.get('/userinfo', controller.identity.userinfo)
  router.post('/logout', controller.identity.logout)

  // modules
  ArchiveModule(app);
  SystemModule(app);
};