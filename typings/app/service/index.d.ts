// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBranch from '../../../app/service/branch';
import ExportSystem from '../../../app/service/system';

declare module 'egg' {
  interface IService {
    branch: ExportBranch;
    system: ExportSystem;
  }
}
