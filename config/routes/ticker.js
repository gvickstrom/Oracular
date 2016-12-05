const express = require('express');
const router = express.Router();
const request = require('request');
const queries = require('../../controllers/queries');
const knex = require('../../db/knex.js');

router.get('/', function (req, res, next) {

  // grab company names from database

    queries.retrieveTickers((error, response, body) => {
      if (error) throw new Error(error);
      let returnObj = {};
      returnObj.message = 'Got tickers succesfully!';
      // var coData = response;
      var coData = response.map((el) => {
        return [el.ticker, el.company_name];
      })
      var dropDownData = [];
      for (var i = 0; i < coData.length; i++) {
        dropDownData.push(coData[i][0] + ':' + coData[i][1])
      }
      res.send(dropDownData);
    });
});


module.exports = router;
