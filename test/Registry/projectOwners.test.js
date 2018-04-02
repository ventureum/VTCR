const Eth = require('ethjs');

var Registry = artifacts.require("Registry");

const projectList = ['project #0', 'project #1', 'project #2'];

contract('Registry.projectOwners', function(accounts) {
    it("Before Apply", async () => {
        var registry = await Registry.deployed();
        var isFounder = await registry.isProjectFounder.call([accounts[0]]);
        assert.equal(isFounder, false,  "Should not be project owner");
    });

    it("After Apply", async () => {
        var registry = await Registry.deployed();
        await registry.apply(projectList[0], 500000);
        var isFounder = await registry.isProjectFounder.call([accounts[0]]);
        assert.equal(isFounder, true,  "Should be project owner");
    });

    it("After Exit", async () => {
        var registry = await Registry.deployed();
        await registry.exit(projectList[0]);
        var isFounder = await registry.isProjectFounder.call([accounts[0]]);
        assert.equal(isFounder, false,  "Should be project owner");
    });
});
