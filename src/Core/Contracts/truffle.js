module.exports = {
  networks: {
    development: {
      host: "172.18.0.2",
      port: 8545,
      network_id: "*" // Match any network id
    },
      local_host:{
          host:"127.0.0.1",
          port:8545,
          network_id:"*"
      }

  }
};
