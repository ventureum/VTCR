module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    networks: {
        development: {
            host: "ganache.ventureum.io",
            port: 8545,
            network_id: "*", // Match any network id
            gas: 5000000
        }
    }
};
