const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../config');
const Twitter = require('twitter-node-client').Twitter;
const watson = require('watson-developer-cloud');

router.get('/:id', function (req, res, next) {

  //get the tweets for selected Stock

  var id = req.params.id;
  var minFollowers = req.query.minFollowers;
  var cashTag = id.substring(0, id.indexOf(':'));

  var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
  };

  var success = function (response, data) {
    var sentimentArr = [];
    var tweetsObj = JSON.parse(response);
    tweetsObj.statuses.forEach(tweet => {
      sentimentArr.push(tweet.text)
    })
    //get sentiment score of tweets

    var alchemy_language = watson.alchemy_language({
      api_key: config.ALCHEMY_KEY
    })

    var parameters = {
      text: sentimentArr.join()
    };

    alchemy_language.sentiment(parameters, function (err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
    });

    res.send(tweetsObj);
  };

  var twitter = new Twitter();

  twitter.getSearch({
    'q': cashTag,
    'count': 10,
    'since': '2016-12-01',
    'until': '2016-12-05'}, error, success);

});


module.exports = router;
