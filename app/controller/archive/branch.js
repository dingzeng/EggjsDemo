'use strict';

const BaseController = require('../base');

class BranchController extends BaseController {
    async getBranchs() {
        const { pageIndex, pageSize, keyword, parentId } = this.ctx.request.query;
        const branchs = await this.service.branch.getBranchs(pageIndex, pageSize, keyword, parentId);
        this.success(branchs);
    }

    async getBranch() {
        const id = this.ctx.params.id;
        const branch = await this.service.branch.getBranch(id);
        this.success(branch);
    }

    async createBranch() {
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
        const branch = await this.service.branch.createBranch(model);

        this.success(branch);
    }

    async updateBranch() {
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
        const success = await this.service.branch.updateBranch(model);

        success ? this.success() : this.failed();
    }

    async deleteBranch() {
        const id = this.ctx.params.id;
        const success = await this.service.branch.deleteBranch(id);
        success ? this.success() : this.failed();
    }

    async getBranchStores() {
        const id = this.ctx.params.id;
        const stores = this.service.branch.getBranchStores(id);
        this.success(stores);
    }
    async updateBranchStores() {
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

module.exports = BranchController;
