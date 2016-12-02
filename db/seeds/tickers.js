
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tickers').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('tickers').insert({
          ticker: 'AAPL',
          company_name: 'Apple Inc'
        }),
        knex('tickers').insert({
          ticker: 'IBM',
          company_name: 'IBM Inc'
        }),
        knex('tickers').insert({
          ticker: 'NLY',
          company_name: 'Annaly Inc'
        }),
        knex('tickers').insert({
          ticker: 'GDX',
          company_name: 'Vectors Gold Miners'
        })
      ]);
    });
};
