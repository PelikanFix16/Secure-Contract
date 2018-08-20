
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "mammal issue rebuild truth lizard police travel foam equal immense rebuild steak";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      gas:4000000
    },
      ropsten: {

          provider: function() {
            return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/51d43a660b604b768089a4483a2b0f31")
          },
          network_id:3,
          gas:4712388
      }
  }
};
