const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../config');
const Twitter = require('twitter-node-client').Twitter;

const watson = require('watson-developer-cloud');
const moment = require('moment');

router.get('/:id', function (req, res, next) {
  var alchemy_language = watson.alchemy_language({
    api_key: process.env.ALCHEMY_KEY
  })

  var twitter = new Twitter(
    {consumerKey: process.env.TWTR_API_KEY,
        consumerSecret: process.env.TWTR_API_SECRET,
        accessToken: process.env.TWTR_ACCESS_TOKEN,
        accessTokenSecret: process.env.TWTR_ACCESS_TOKEN_SECRET
    });

  var id = req.params.id;
  var minFollowers = req.query.minFollowers;
  var cashTag = id.substring(0, id.indexOf(':'));
  var cashlessTag = cashTag.slice(1);
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
    console.log(err,response,body);
  };
  // var sentimentArr = []
  // var sentimentObj = {};
  var sentimentScores = [];

  var success = function(response){
    console.log(response);
      var tweetsObj = JSON.parse(response);
      var tweetMap = tweetsObj.statuses.map(tweet => {
        return new Promise((resolve, reject) => {
          let date = tweet.created_at;
          let text = tweet.text;
            alchemy_language.sentiment({text}, function (err, res) {
              if (err)
                reject(err);
              else {
                resolve(res.docSentiment.score);
              }
              });
            })
          })
          return Promise.all(tweetMap)
        }


  //map on relevant dates, return different promises, then have them all inside of a promise.all

  //api call 1 over array of dates and return an array of tweets


  function getTheDates (date, until) {
    return new Promise((resolve, reject) => {
      twitter.getSearch({
        'q': cashTag,
        'count': 10,
        'since': date,
        'until': until,
      }, reject, resolve)

    var alchemy_language = watson.alchemy_language({
      api_key:process.env.ALCHEMY_KEY
    })
  }

  Promise.all(relevantDates.map((until, i) => {
    return getTheDates(relevantDates[i-1], until)
  })).then((dates) => {
    return Promise.all(dates.map(date => success(date)))
  }).catch(error => console.log('first log:', error))

  .then(scores => {
    console.log(cashlessTag, startDate, endDate);
    var options = {
      method: 'GET',
      url: `https://api.intrinio.com/prices?identifier=${cashlessTag}&start_date=${startDate}&end_date=${endDate}`,
      qs: { username: process.env.INT_USERNAME,
            password: process.env.INT_PASSWORD },
            headers: { 'Authorization': 'Basic ZTFjYTExZDMxZWU5YWZlM2E0NjA0NzU4M2UxMmY2YTM6MGJiZjdkOGMzYTM2MDMyMjJlZjQwNTVlYWIyNDcwMTU='}
          };

        request(options, function (error, response, body) {
        if (error) throw new Error(error);
        body = JSON.parse(body);
        let priceData = body.data;
        console.log(priceData);
        let eodPrices = [];
        for (var i = 0; i < priceData.length; i++) {
          eodPrices.push(priceData[i].close)
        }
        res.json({eodPrices, scores})
      })
    }).catch(console.log)
  });





module.exports = router;
