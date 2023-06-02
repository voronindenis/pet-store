module.exports = {
  '/api/v3/*': {
    target: 'https://petstore3.swagger.io',
    logLevel: 'debug',
    changeOrigin: true,
  },
};
