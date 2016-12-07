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
    var sentimentArr = []
    var sentimentObj = {};
    var tweetsObj = JSON.parse(response);
    tweetsObj.statuses.forEach(tweet => {
      sentimentObj.date = tweet.created_at;
      sentimentObj.status = tweet.text;
      sentimentArr.push(sentimentObj);
      console.log(sentimentArr);
    })
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




    // var arrOfTweets = sentimentArr.map(day => day[1]);
    // var tweetsSentiment = arrOfTweets.map(tweet => {
    //       var alchemy_language = watson.alchemy_language({
    //         api_key: config.ALCHEMY_KEY
    //       })
    //
    //       var parameters = {
    //         text: tweet
    //       };
    //
    //      alchemy_language.sentiment(parameters, function (err, response) {
    //       if (err)
    //         console.log('error:', err);
    //       else
    //         return JSON.stringify(response, null, 2);
    //   });
    // })


    /*get sentiment score of tweets*/

    // var alchemy_language = watson.alchemy_language({
    //   api_key: config.ALCHEMY_KEY
    // })
    //
    // var parameters = {
    //   text: sentimentArr.join()
    // };
    //
    // alchemy_language.sentiment(parameters, function (err, response) {
    //   if (err)
    //     console.log('error:', err);
    //   else
    //     console.log(JSON.stringify(response, null, 2));
    // });

    /*get sentiment score of tweets*/

    // res.send(tweetsObj);



});


module.exports = router;
