'use strict';

const BaseController = require('../base');

class BranchGroupController extends BaseController {
    async getBranchGroups() {
        const branchGroups = await this.service.branch.getBranchGroups();
        this.success(branchGroups);
    }

    async getBranchGroup() {
        const id = this.ctx.params.id;
        const branchGroup = await this.service.branch.getBranchGroup(id);
        this.success(branchGroup);
    }

    async createBranchGroup() {
        const rules = {
            Name: { type: 'string' }
        };
        this.ctx.validate(rules);
        const model = this.ctx.request.body;
        const branchGroup = await this.service.branch.createBranchGroup(model);
        this.success(branchGroup);
    }

    async updateBranchGroup() {
        const rules = {
            Id: { type: 'int' },
            Name: { type: 'string' }
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

    async deleteBranchGroup() {
        const id = this.ctx.params.id;
        const success = await this.service.branch.deleteBranchGroup(id);
        success ? this.success() : this.failed();
    }

    async getBranchGroupBranchs() {
        const branchGroupId = this.ctx.params.id;
        const branchs = await this.service.branch.getBranchGroupBranchs(branchGroupId);
        this.success(branchs);
    }

    async deleteBranchGroupBranchs() {
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

    async addBranchGroupBranchs() {
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

module.exports = BranchGroupController;
