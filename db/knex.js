const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
console.log(environment);
module.exports = require('knex')(config);
