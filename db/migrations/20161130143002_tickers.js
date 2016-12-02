
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tickers', (table) => {
    table.increments();
    table.varchar('ticker');
    table.varchar('company_name');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tickers');
};
