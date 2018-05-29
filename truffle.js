const HDWalletProvider = require('truffle-hdwallet-provider')
const fs = require('fs')

let mnemonic = ''

if (fs.existsSync('mnemonic.txt')) {
  mnemonic = fs.readFileSync('mnemonic.txt').toString().split('\n')[0]
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 5000000,
      provider: new HDWalletProvider(mnemonic, "http://localhost:8545",0, 4)
    },
    geth: {
      host: 'geth.ventureum.io',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 5000000
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/UIovb3o3e1Q0SRHdLaTZ'),
      network_id: '*',
      gas: 6000000,
      gasPrice: 2000000000
    }
  }
}
