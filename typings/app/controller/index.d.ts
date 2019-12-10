// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportIdentity from '../../../app/controller/identity';
import ExportSystem from '../../../app/controller/system';
import ExportTest from '../../../app/controller/test';
import ExportArchiveBranch from '../../../app/controller/archive/branch';
import ExportArchiveBranchGroup from '../../../app/controller/archive/branchGroup';

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
