import { Context, Service } from 'egg';
import grpcLoader from '../grpcLoader';

const protoFilePath = __dirname + '/../../protos/archive.proto';
const packageName = 'Archive';
const serviceName = 'BranchSrv';

export default class BranchService extends Service {

  client: any;
  constructor(ctx: Context) {
    super(ctx);
    let address = ctx.app.config.grpc.address.archive;
    this.client = grpcLoader(protoFilePath, packageName, serviceName, address);
  }

  public async getBranchGroups() {
    return this.client.call('GetBranchGroups')
  }

  public async getBranchGroup(id: string): Promise<BranchGroup> {
    return this.client.call('GetBranchGroup', { body: id })
  }

  public async createBranchGroup(branchGroup: BranchGroup): Promise<BranchGroup> {
    return this.client.call('CreateBranchGroup', branchGroup)
  }

  public async updateBranchGroup(branchGroup) {
    const res = await this.client.call('UpdateBranchGroup', branchGroup)
    return res.body
  }

  public async deleteBranchGroup(id) {
    const res = await this.client.call('DeleteBranchGroup', { body: id })
    return res.body
  }

  public async getBranchGroupBranchs(branchGroupId) {
    return this.client.call('GetBranchGroupBranchs', { body: branchGroupId })
  }

  public async deleteBranchGroupBranchs(branchGroupId, branchIdList) {
    const param = {
      branchGroupId,
      branchIdList
    }
    const res = await this.client.call('DeleteBranchGroupBranchs', param)
    return res.body
  }

  public async addBranchGroupBranchs(branchGroupId, branchIdList) {
    const param = {
      branchGroupId,
      branchIdList
    }
    const res = await this.client.call('AddBranchGroupBranchs', param)
    return res.body
  }

  /**
   * 机构分页
   * @param {Number} pageIndex 页码
   * @param {Number} pageSize 页大小
   * @param {String} keyword 搜索关键字
   * @param {String} parentId 上级机构编码
   */
  public async getBranchs(pageIndex = 1, pageSize = 20, keyword = '', parentId = '') {
    const param = {
      pageIndex,
      pageSize,
      keyword,
      parentId
    }
    return this.client.call('GetBranchs', param)
  }

  public async getBranch(id) {
    return this.client.call('GetBranch', { body: id })
  }

  public async createBranch(branch) {
    return this.client.call('CreateBranch', branch)
  }

  public async updateBranch(branch) {
    const res = await this.client.call('UpdateBranch', branch)
    return res.body
  }

  public async deleteBranch(id) {
    return this.client.call('DeleteBranch', { body: id })
  }

  public async getBranchStores(id) {
    return this.client.call('GetBranchStores', { body: id })
  }

  public async updateBranchStores(branchId, stores) {
    const res = await this.client.call('UpdateBranchStores', { branchId, stores })
    return res.body
  }
}
