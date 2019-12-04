import {
  BranchGroup,
  Branch,
  Store
} from '../model/module'
import { Context, Service } from 'egg';
import grpcLoader from '../grpcLoader';

const protoFilePath = __dirname + '/../../protos/archive.proto';
const packageName = 'Archive';
const serviceName = 'BranchSrv';

export default class BranchService extends Service {

  /**
   * Grpc client
   */
  client: any;

  /**
   * Ctor
   */
  constructor(ctx: Context) {
    super(ctx)
    let address = ctx.app.config.grpc.address.archive;
    this.client = grpcLoader(protoFilePath, packageName, serviceName, address);
  }

  public async getBranchGroups(): Promise<Array<BranchGroup>> {
    let response = await this.client.call('GetBranchGroups')
    return response.branchGroups
  }

  public async getBranchGroup(id: string): Promise<BranchGroup> {
    return this.client.call('GetBranchGroup', { body: id })
  }

  public async createBranchGroup(branchGroup: BranchGroup): Promise<BranchGroup> {
    return this.client.call('CreateBranchGroup', branchGroup)
  }

  public async updateBranchGroup(branchGroup: BranchGroup): Promise<BranchGroup> {
    const res = await this.client.call('UpdateBranchGroup', branchGroup)
    return res.body
  }

  public async deleteBranchGroup(id: number): Promise<boolean> {
    const res = await this.client.call('DeleteBranchGroup', { body: id })
    return res.body
  }

  public async getBranchGroupBranchs(branchGroupId: number): Promise<Branch> {
    return this.client.call('GetBranchGroupBranchs', { body: branchGroupId })
  }

  public async deleteBranchGroupBranchs(branchGroupId: number, branchIdList: Array<number>): Promise<boolean> {
    const param = {
      branchGroupId,
      branchIdList
    }
    const res = await this.client.call('DeleteBranchGroupBranchs', param)
    return res.body
  }

  public async addBranchGroupBranchs(branchGroupId: number, branchIdList: Array<number>): Promise<boolean> {
    const param = {
      branchGroupId,
      branchIdList
    }
    const res = await this.client.call('AddBranchGroupBranchs', param)
    return res.body
  }

  /**
   * 机构分页
   * @param pageIndex 页码
   * @param pageSize 页大小
   * @param keyword 搜索关键字
   * @param parentId 上级机构编码
   */
  public async getBranchs(pageIndex: number = 1, pageSize: number = 20, keyword: string = '', parentId: string = ''): Promise<Array<Branch>> {
    const param = {
      pageIndex,
      pageSize,
      keyword,
      parentId
    }
    return this.client.call('GetBranchs', param)
  }

  public async getBranch(id: number): Promise<Branch> {
    return this.client.call('GetBranch', { body: id })
  }

  public async createBranch(branch: Branch): Promise<Branch> {
    return this.client.call('CreateBranch', branch)
  }

  public async updateBranch(branch: Branch): Promise<boolean> {
    const res = await this.client.call('UpdateBranch', branch)
    return res.body
  }

  public async deleteBranch(id: number): Promise<Branch> {
    return this.client.call('DeleteBranch', { body: id })
  }

  public async getBranchStores(id: number): Promise<Store> {
    let response = this.client.call('GetBranchStores', { body: id })
    return response.stores
  }

  public async updateBranchStores(branchId: number, stores: Array<Store>): Promise<boolean> {
    const res = await this.client.call('UpdateBranchStores', { branchId, stores })
    return res.body
  }
}
