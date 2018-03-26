const Eth = require('ethjs');

var Registry = artifacts.require("Registry");

const projectList = ['project #0', 'project #1', 'project #2'];

contract('Registry.getNextProjectHash - Adding items', function(accounts) {
    it("Empty list", async () => {
        registry = await Registry.deployed();
        var next = await registry.getNextProjectHash.call(0);
        var num = new Eth.BN(next.substring(2), 16);
        assert(num.eq(new Eth.BN('0')), "Should return 0x0");
    });

    it("One project", async () => {
        registry = await Registry.deployed();
        await registry.apply(projectList[0], 500000, {from: accounts[0]});
        var next = await registry.getNextProjectHash.call(0);
        var hash = await web3.sha3(projectList[0]);
        assert.equal(next, hash, "First project hash is incorrect");
    });

    it("Two projects", async () => {
        registry = await Registry.deployed();
        await registry.apply(projectList[1], 500000, {from: accounts[0]});

        // first project
        // Note that our list is in non-increasing chronological order
        // i.e. latest added item is at the front of the list
        var next = await registry.getNextProjectHash.call(0);
        var hash = await web3.sha3(projectList[1]);
        assert.equal(next, hash, "First project hash is incorrect");

        // Second project
        next = await registry.getNextProjectHash.call(next);
        hash = await web3.sha3(projectList[0]);
        assert.equal(next, hash, "Second project hash is incorrect");
    });

    it("Three projects", async () => {
        registry = await Registry.deployed();
        await registry.apply(projectList[2], 500000, {from: accounts[0]});

        // first project
        // Note that our list is in non-increasing chronological order
        // i.e. latest added item is at the front of the list
        var next = await registry.getNextProjectHash.call(0);
        var hash = await web3.sha3(projectList[2]);
        assert.equal(next, hash, "First project hash is incorrect");

        next = await registry.getNextProjectHash.call(next);
        hash = await web3.sha3(projectList[1]);
        assert.equal(next, hash, "Second project hash is incorrect");

        // Second project
        next = await registry.getNextProjectHash.call(next);
        hash = await web3.sha3(projectList[0]);
        assert.equal(next, hash, "Third  project hash is incorrect");
    });
});
