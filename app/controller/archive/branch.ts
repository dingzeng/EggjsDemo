
import BaseController from '../base'

export default class BranchController extends BaseController {
    public async getBranchs() {
        const { pageIndex, pageSize, keyword, parentId } = this.ctx.request.query;
        const response = await this.service.branch.getBranchs(pageIndex, pageSize, keyword, parentId);
        this.success({
            list: response.branchs,
            totalCount: response.totalCount
        });
    }

    public async getBranch() {
        const id = this.ctx.params.id;
        const branch = await this.service.branch.getBranch(id);
        this.success(branch);
    }

    public async createBranch() {
        const rules = {
            id: { type: 'int' },
            name: { type: 'string' }
        };
        const errors = this.app.validator.validate(rules, this.ctx.request.body);
        if (errors) {
            this.validationFailed(errors);
            return;
        }

        const model = this.ctx.request.body;
        const branch = await this.service.branch.createBranch(model);

        this.success(branch);
    }

    public async updateBranch() {
        const rules = {
            id: { type: 'int' },
            name: { type: 'string' }
        };
        const errors = this.app.validator.validate(rules, this.ctx.request.body);
        if (errors) {
            this.validationFailed(errors);
            return;
        }

        const model = this.ctx.request.body;
        const success = await this.service.branch.updateBranch(model);

        success ? this.success() : this.failed();
    }

    public async deleteBranch() {
        const id = this.ctx.params.id;
        const success = await this.service.branch.deleteBranch(id);
        success ? this.success() : this.failed();
    }

    public async getBranchStores() {
        const id = this.ctx.params.id;
        const stores = this.service.branch.getBranchStores(id);
        this.success(stores);
    }
    public async updateBranchStores() {
        const rules = {

        };
        const errors = this.app.validator.validate(rules, this.ctx.request.body);
        if (errors) {
            this.validationFailed(errors);
            return;
        }

        const { branchId, stores } = this.ctx.request.body;
        const success = await this.service.branch.updateBranchStores(branchId, stores);

        success ? this.success() : this.failed();
    }
}