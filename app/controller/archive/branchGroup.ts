import BaseController from '../base'

export default class BranchGroupController extends BaseController {
    public async getBranchGroups() {
        const branchGroups = await this.service.branch.getBranchGroups();
        this.success(branchGroups);
    }

    public async getBranchGroup() {
        const id = this.ctx.params.id;
        const branchGroup = await this.service.branch.getBranchGroup(id);
        this.success(branchGroup);
    }

    public async createBranchGroup() {
        const rules = {
            name: { type: 'string' }
        };
        this.ctx.validate(rules);
        const model = this.ctx.request.body;
        const branchGroup = await this.service.branch.createBranchGroup(model);
        this.success(branchGroup);
    }

    public async updateBranchGroup() {
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
        const success = await this.service.branch.updateBranchGroup(model);

        success ? this.success() : this.failed();
    }

    public async deleteBranchGroup() {
        const id = this.ctx.params.id;
        const success = await this.service.branch.deleteBranchGroup(id);
        success ? this.success() : this.failed();
    }

    public async getBranchGroupBranchs() {
        const branchGroupId = this.ctx.params.id;
        const branchs = await this.service.branch.getBranchGroupBranchs(branchGroupId);
        this.success(branchs);
    }

    public async deleteBranchGroupBranchs() {
        const branchGroupId = this.ctx.params.id;
        const rules = {
            branchIdList: {
                type: 'array',
                itemType: 'string'
            }
        }
        const model = this.ctx.request.body;
        const errors = this.app.validator.validate(rules, model);
        if (errors) {
            this.validationFailed(errors);
        }
        const success = await this.service.branch.deleteBranchGroupBranchs(branchGroupId, model.branchIdList);
        success ? this.success() : this.failed();
    }

    public async addBranchGroupBranchs() {
        const branchGroupId = this.ctx.params.id;
        const rules = {
            branchIdList: {
                type: 'array',
                itemType: 'string'
            }
        }
        const model = this.ctx.request.body;
        const errors = this.app.validator.validate(rules, model);
        if (errors) {
            this.validationFailed(errors);
        }
        const success = await this.service.branch.addBranchGroupBranchs(branchGroupId, model.branchIdList);
        success ? this.success() : this.failed();
    }
}
