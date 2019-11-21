'use strict';

const protoFilePath = __dirname + '/../../../../../Services/protos/archive.proto';
const packageName = 'Archive';
const serviceName = 'BranchSrv';
const address = '127.0.0.1:80051';
const client = require('../grpcLoader')(protoFilePath, packageName, serviceName, address);

const Service = require('egg').Service;

class BranchService extends Service {
  async getBranchGroups() {
    return new Promise(function (resolve, reject) {
      client.GetBranchGroups({}, function (error, feature) {
        if (error) {
          reject(error)
        } else {
          resolve(feature)
        }
      });
    })
  }

  async getBranchGroup(id) {
    return new Promise(function (resolve, reject) {
      client.GetBranchGroup({ Body: id }, function (error, feature) {
        if (error) {
          reject(error)
        } else {
          resolve(feature)
        }
      });
    })
  }

  async createBranchGroup(branchGroup) {
    return new Promise(function (resolve, reject) {
      client.CreateBranchGroup(branchGroup, function (error, feature) {
        if (error) {
          reject(error)
        } else {
          resolve(feature)
        }
      });
    })
  }

  async updateBranchGroup(branchGroup) {
    return new Promise(function (resolve, reject) {
      client.UpdateBranchGroup(branchGroup, function (error, feature) {
        if (error) {
          resolve(false)
        } else {
          resolve(feature.Body)
        }
      });
    })
  }

  async deleteBranchGroup(id) {
    return new Promise(function (resolve, reject) {
      client.DeleteBranchGroup({ Body: id }, function (error, feature) {
        if (error) {
          resolve(false)
        } else {
          resolve(feature.Body)
        }
      });
    })
  }

  async getBranchGroupBranchs(branchGroupId) {
    return new Promise(function (resolve, reject) {
      client.GetBranchGroupBranchs({ Body: branchGroupId }, function (error, feature) {
        if (error) {
          reject(error)
        } else {
          resolve(feature)
        }
      });
    })
  }

  async deleteBranchGroupBranchs(branchGroupId, branchIdList) {
    return new Promise(function (resolve, reject) {
      client.DeleteBranchGroupBranchs({ BranchGroupId: branchGroupId, BranchIdList: branchIdList }, function (error, feature) {
        if (error) {
          resolve(false)
        } else {
          resolve(feature.Body)
        }
      });
    })
  }

  async addBranchGroupBranchs(branchGroupId, branchIdList) {
    return new Promise(function (resolve, reject) {
      client.AddBranchGroupBranchs({ BranchGroupId: branchGroupId, BranchIdList: branchIdList }, function (error, feature) {
        if (error) {
          resolve(false)
        } else {
          resolve(feature.Body)
        }
      });
    })
  }

  /**
   * 机构分页
   * @param {Number} pageIndex 页码
   * @param {Number} pageSize 页大小
   * @param {String} keyword 搜索关键字
   * @param {String} parentId 上级机构编码
   */
  async getBranchs(pageIndex = 1, pageSize = 20, keyword = '', parentId = '') {
    return new Promise(function (resolve, reject) {
      client.GetBranchs({
        PageIndex: pageIndex,
        PageSize: pageSize,
        Keyword: keyword,
        ParentId: parentId
      }, function (error, feature) {
        if (error) {
          reject(error)
        } else {
          resolve(feature)
        }
      });
    })
  }

  async getBranch(id) {
    return new Promise(function (resolve, reject) {
      client.GetBranch({ Body: id }, function (error, feature) {
        if (error) {
          reject(error)
        } else {
          resolve(feature)
        }
      });
    })
  }

  async createBranch(branch) {
    return new Promise(function (resolve, reject) {
      client.CreateBranch(branch, function (error, feature) {
        if (error) {
          reject(error)
        } else {
          resolve(feature)
        }
      });
    })
  }

  async updateBranch(branch) {
    return new Promise(function (resolve, reject) {
      client.UpdateBranch(branch, function (error, feature) {
        if (error) {
          resolve(false)
        } else {
          resolve(feature.Body)
        }
      });
    })
  }

  async deleteBranch(id) {
    return new Promise(function (resolve, reject) {
      client.DeleteBranch({ Body: id }, function (error, feature) {
        if (error) {
          resolve(false)
        } else {
          resolve(feature.Body)
        }
      });
    })
  }

  async getBranchStores(id) {
    return new Promise(function (resolve, reject) {
      client.GetBranchStores({ Body: id }, function (error, feature) {
        if (error) {
          resolve(null)
        } else {
          resolve(feature)
        }
      });
    })
  }

  async updateBranchStores(branchId, stores) {
    return new Promise(function (resolve, reject) {
      client.UpdateBranchStores({ BranchId: branchId, Stores: stores }, function (error, feature) {
        if (error) {
          resolve(false)
        } else {
          resolve(feature.Body)
        }
      });
    })
  }
}

module.exports = BranchService;
