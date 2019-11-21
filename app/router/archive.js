'use strict';

module.exports = app => {
    const { router, controller } = app;
    
    // branchGroup
    router.get('/archive/branchGroups', controller.archive.branchGroup.getBranchGroups)
    router.get('/archive/branchGroup/:id', controller.archive.branchGroup.getBranchGroup)
    router.post('/archive/branchGroup', controller.archive.branchGroup.createBranchGroup)
    router.put('/archive/branchGroup', controller.archive.branchGroup.updateBranchGroup)
    router.del('/archive/branchGroup/:id', controller.archive.branchGroup.deleteBranchGroup)
    router.get('/archive/branchGroup/:id/branchs', controller.archive.branchGroup.getBranchGroupBranchs)
    router.del('/archive/branchGroup/:id/branchs', controller.archive.branchGroup.deleteBranchGroupBranchs)
    router.post('/archive/branchGroup/:id/branchs', controller.archive.branchGroup.addBranchGroupBranchs)

    // branch
    router.get("/archive/branchs",controller.archive.branch.getBranchs);
    router.get("/archive/branch/:id",controller.archive.branch.getBranch);
    router.post("/archive/branch",controller.archive.branch.createBranch);
    router.put("/archive/branch",controller.archive.branch.updateBranch);
    router.del("/archive/branch/:id",controller.archive.branch.deleteBranch);
    router.get("/archive/branch/:id/stores",controller.archive.branch.getBranchStores);
    router.put("/archive/branch/:id/stores",controller.archive.branch.updateBranchStores);
}