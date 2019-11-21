// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase = require('../../../app/controller/base');
import ExportIdentity = require('../../../app/controller/identity');
import ExportSystem = require('../../../app/controller/system');
import ExportTest = require('../../../app/controller/test');
import ExportArchiveBranch = require('../../../app/controller/archive/branch');
import ExportArchiveBranchGroup = require('../../../app/controller/archive/branchGroup');

declare module 'egg' {
  interface IController {
    base: ExportBase;
    identity: ExportIdentity;
    system: ExportSystem;
    test: ExportTest;
    archive: {
      branch: ExportArchiveBranch;
      branchGroup: ExportArchiveBranchGroup;
    }
  }
}
