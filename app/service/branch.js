'use strict';

const protoFilePath = __dirname + '/../../protos/archive.proto';
const packageName = 'Archive';
const serviceName = 'BranchSrv';

module.exports = app => {

  const address = app.config.grpc.address.archive;
  const client = require('../grpcLoader')(protoFilePath, packageName, serviceName, address);

  return class BranchService extends app.Service {

    async getBranchGroups() {
      return client.call('GetBranchGroups')
    }

    async getBranchGroup(id) {
      return client.call('GetBranchGroup', { body: id })
    }

    async createBranchGroup(branchGroup) {
      return client.call('CreateBranchGroup', branchGroup)
    }

    async updateBranchGroup(branchGroup) {
      const res = await client.call('UpdateBranchGroup', branchGroup)
      return res.body
    }

    async deleteBranchGroup(id) {
      const res = await client.call('DeleteBranchGroup', { body: id })
      return res.body
    }

    async getBranchGroupBranchs(branchGroupId) {
      return client.call('GetBranchGroupBranchs', { body: branchGroupId })
    }

    async deleteBranchGroupBranchs(branchGroupId, branchIdList) {
      const param = { 
        branchGroupId, 
        branchIdList 
      }
      const res = await client.call('DeleteBranchGroupBranchs', param)
      return res.body
    }

    async addBranchGroupBranchs(branchGroupId, branchIdList) {
      const param = {
        branchGroupId,
        branchIdList
      }
      const res = await client.call('AddBranchGroupBranchs', param)
      return res.body
    }

    /**
     * 机构分页
     * @param {Number} pageIndex 页码
     * @param {Number} pageSize 页大小
     * @param {String} keyword 搜索关键字
     * @param {String} parentId 上级机构编码
     */
    async getBranchs(pageIndex = 1, pageSize = 20, keyword = '', parentId = '') {
      const param = {
        pageIndex,
        pageSize,
        keyword,
        parentId
      }
      return client.call('GetBranchs', param)
    }

    async getBranch(id) {
      return client.call('GetBranch', { body: id })
    }

    async createBranch(branch) {
      return client.call('CreateBranch', branch)
    }

    async updateBranch(branch) {
      const res = await client.call('UpdateBranch', branch)
      return res.body
    }

    async deleteBranch(id) {
      return client.call('DeleteBranch', { body: id })
    }

    async getBranchStores(id) {
      return client.call('GetBranchStores', { body: id })
    }

    async updateBranchStores(branchId, stores) {
      const res = await client.call('UpdateBranchStores', { branchId, stores })
      return res.body
    }
  }
}
