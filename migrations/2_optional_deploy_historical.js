const Sale = artifacts.require('historical/Sale.sol');
const SafeMath= artifacts.require('../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol')
const fs = require('fs');
const BN = require('bn.js');

module.exports = (deployer, network, accounts) => {
  if (network != 'mainnet') {
    const testFolder = './';
    const fs = require('fs');

    fs.readdir(testFolder, (err, files) => {
      files.forEach(file => {
        console.log(file);
      });
    })
    const saleConf = JSON.parse(fs.readFileSync('./conf/historical/sale.json'));
    const tokenConf = JSON.parse(fs.readFileSync('./conf/historical/token.json'));
    const preBuyersConf = JSON.parse(fs.readFileSync('./conf/historical/preBuyers.json'));
    const foundersConf = JSON.parse(fs.readFileSync('./conf/historical/founders.json'));

    saleConf.owner = accounts[0];

    const preBuyers = [];
    const preBuyersTokens = [];
    for (recipient in preBuyersConf) {
      preBuyers.push(preBuyersConf[recipient].address);
      preBuyersTokens.push(new BN(preBuyersConf[recipient].amount, 10));
    }

    const founders = [];
    const foundersTokens = [];
    for (recipient in foundersConf.founders) {
      founders.push(foundersConf.founders[recipient].address);
      foundersTokens.push(new BN(foundersConf.founders[recipient].amount, 10));
    }

    const vestingDates = [];
    for (date in foundersConf.vestingDates) {
      vestingDates.push(foundersConf.vestingDates[date]);
    }

    deployer.deploy(Sale,
      saleConf.owner,
      saleConf.wallet,
      tokenConf.initialAmount,
      tokenConf.tokenName,
      tokenConf.decimalUnits,
      tokenConf.tokenSymbol,
      saleConf.price,
      saleConf.startBlock,
      saleConf.freezeBlock);
  }
};
