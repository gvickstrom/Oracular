const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../config');
const Twitter = require('twitter-node-client').Twitter;
const watson = require('watson-developer-cloud');
const moment = require('moment');

router.get('/:id', function (req, res, next) {

  var id = req.params.id;
  var minFollowers = req.query.minFollowers;
  var cashTag = id.substring(0, id.indexOf(':'));
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;
  var relevantDates = getDates(startDate, endDate);

  //helper function to get array of dates
  function getDates(startDate, endDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    while (moment(currentDate) <= moment(endDate)) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}
//helper function to get array of dates

  var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
  };

  var success = function (response, data) {

    //get the array of tweets back based on dates specified
    var sentimentArr = []
    var sentimentObj = {};
    var tweetsObj = JSON.parse(response);
    tweetsObj.statuses.forEach(tweet => {
      sentimentObj.date = tweet.created_at;
      sentimentObj.status = tweet.text;
      sentimentArr.push(sentimentObj);
    })
    //get the array of sentiment scores back
    var dates = [];
    var scores = [];
    var finalSentimentObj = {};
    var tweetsSentiment = sentimentArr.forEach(obj => {
      dates.push(obj.date);
      var alchemy_language = watson.alchemy_language({
        api_key: config.ALCHEMY_KEY
      })

      var parameters = {
        text: obj.status
      };

     alchemy_language.sentiment(parameters, function (err, response) {
      if (err)
        console.log('error:', err);
      else
         var returnStr = JSON.stringify(response, null, 2);
         var returnObj = JSON.parse(returnStr);
         console.log(returnObj.status);
      });
    });
    console.log(dates, scores);
  };

  for (var i = 1; i < relevantDates.length; i++) {
    var twitter = new Twitter();

    twitter.getSearch({
      'q': cashTag,
      'count': 10,
      'since': relevantDates[i-1],
      'until': relevantDates[i]
    }, error, success);
  }

    /*get sentiment score of tweets*/

    res.send(sentimentArr); //send the array of dates and sentiment back to the front end to be used as data input for the graph

});


module.exports = router;
