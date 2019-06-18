const path = require('path');

const { ENV } = require('./utils/config');
const envs = require('./utils/envs');

console.log(ENV, envs);

if (!envs[ENV]) throw new Error(`Unknown env: ${ENV}`);

module.exports = require(path.resolve('webpack', `webpack.${ENV}.config`));