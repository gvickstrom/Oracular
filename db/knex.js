const environment = 'development';
const config = require('../knexfile.js')[environment];
console.log(environment);
module.exports = require('knex')(config);
