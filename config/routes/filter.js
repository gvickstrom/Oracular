const express = require('express');
const router = express.Router();
const request = require('request');
const Twitter = require('twitter-node-client').Twitter;

router.get('/', function (req, res, next) {
  // twitter.getSearch({'q':'#haiku','count': 10}, error, success);
  Twitter.getSearch = function (params, error, success) {
    var encodedQuery = encodeURIComponent(params.q);
    delete params.q;
    var path = '/search/tweets.json?q=$IBM';
    var url = this.baseUrl + path;
    this.doRequest(url, error, success);
  };
  console.log(response);
});

module.exports = router;
