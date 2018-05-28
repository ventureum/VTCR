const Eth = require('ethjs');

var Registry = artifacts.require("Registry");

const projectList = ['project #0', 'project #1', 'project #2'];

contract('Registry.getNextProjectHash - Removing items', function(accounts) {
    it("Add a project, then remove it", async () => {
        registry = await Registry.deployed();
        await registry.apply(projectList[0], 500000, {from: accounts[0]});
        await registry.exit(projectList[0], {from: accounts[0]});
        var next = await registry.getNextProjectHash.call(0);
        var num = new Eth.BN(next.substring(2), 16);
        assert(num.eq(new Eth.BN('0')), "Should return 0x0");
    });

    it("Add two project, then remove the newer one", async () => {
        registry = await Registry.deployed();
        await registry.apply(projectList[0], 500000, {from: accounts[0]});
        await registry.apply(projectList[1], 500000, {from: accounts[0]});
        await registry.exit(projectList[1], {from: accounts[0]});
        var next = await registry.getNextProjectHash.call(0);
        var hash = await web3.sha3(projectList[0]);
        assert.equal(next, hash, "The older project hash is incorrect");
    });

    it("Add two project, then remove the older one", async () => {
        registry = await Registry.deployed();
        await registry.apply(projectList[1], 500000, {from: accounts[0]});
        await registry.exit(projectList[0], {from: accounts[0]});
        var next = await registry.getNextProjectHash.call(0);
        var hash = await web3.sha3(projectList[1]);
        assert.equal(next, hash, "The newer project hash is incorrect");
    });

    it("Add two project, then remove both", async () => {
        registry = await Registry.deployed();
        await registry.apply(projectList[1], 500000, {from: accounts[0]});
        await registry.exit(projectList[0], {from: accounts[0]});
        await registry.exit(projectList[1], {from: accounts[0]});
        var next = await registry.getNextProjectHash.call(0);
        var num = new Eth.BN(next.substring(2), 16);
        assert(num.eq(new Eth.BN('0')), "Should return 0x0");
    });
});
