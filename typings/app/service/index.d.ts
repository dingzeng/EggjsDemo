// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBranch = require('../../../app/service/branch');
import ExportItem = require('../../../app/service/item');
import ExportSupplier = require('../../../app/service/supplier');
import ExportSystem = require('../../../app/service/system');

declare module 'egg' {
  interface IService {
    branch: ExportBranch;
    item: ExportItem;
    supplier: ExportSupplier;
    system: ExportSystem;
  }
}
