// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportModule from '../../../app/model/module';
import ExportPaged from '../../../app/model/paged';
import ExportArchiveBranch from '../../../app/model/archive/branch';
import ExportArchiveBranchGroup from '../../../app/model/archive/branchGroup';
import ExportArchiveStore from '../../../app/model/archive/store';
import ExportSystemMenu from '../../../app/model/system/menu';
import ExportSystemMenuNode from '../../../app/model/system/menuNode';
import ExportSystemPermission from '../../../app/model/system/permission';
import ExportSystemRole from '../../../app/model/system/role';
import ExportSystemUser from '../../../app/model/system/user';

declare module 'egg' {
  interface IModel {
    Module: ReturnType<typeof ExportModule>;
    Paged: ReturnType<typeof ExportPaged>;
    Archive: {
      Branch: ReturnType<typeof ExportArchiveBranch>;
      BranchGroup: ReturnType<typeof ExportArchiveBranchGroup>;
      Store: ReturnType<typeof ExportArchiveStore>;
    }
    System: {
      Menu: ReturnType<typeof ExportSystemMenu>;
      MenuNode: ReturnType<typeof ExportSystemMenuNode>;
      Permission: ReturnType<typeof ExportSystemPermission>;
      Role: ReturnType<typeof ExportSystemRole>;
      User: ReturnType<typeof ExportSystemUser>;
    }
  }
}
