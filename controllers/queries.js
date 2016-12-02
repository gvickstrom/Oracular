const knex = require('../db/knex');

/*for populating the database initially

exports.clearTickers = function(callback) {
  knex('tickers').del()
  .then(results => {
    callback(null, results);
  })
  .catch(err => {
    callback(err);
  });
};

exports.updateTickers = function(object, callback) {
  knex('tickers')
  .insert(object)
  .then(function () {
    callback(null, object.name);
  })
  .catch(err => {
    callback(err);
  });
};

*/

/*for retrieving companies for user to selection*/

exports.retrieveTickers = (object, callback) => {
  knex('tickers')
  .select('*')
  .then(results => {
    callback(null, results);
  })
  .catch(err => {
    callback(err);
  });
};
