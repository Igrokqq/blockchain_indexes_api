/* eslint-disable import/prefer-default-export */
export const getConfig = () => ({
  port: process.env.PORT,
  insura: {
    ropstenEndpoints: {
      https: process.env.ROPSTEN_HTTPS_ENDPOINT,
      websockets: process.env.ROPSTEN_WEBSOCKETS_ENDPOINT,
    },
  },
  smartContractAddress: process.env.SMART_CONTRACT_ADDRESS,
});
