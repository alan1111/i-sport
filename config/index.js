const devConfig = require('./dev');
const proConfig = require('./pro');

const env = process.env.NODE_ENV || 'dev';
const resConfig = {
  dev: devConfig,
  pro: proConfig
}[env];

module.exports = {
  resConfig
}