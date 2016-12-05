//for updating the database initially

  var options = {
    method: 'GET',
    url: 'https://api.intrinio.com/companies',
    qs: { username: process.env.INT_USERNAME,
          password: process.env.INT_PASSWORD },
          headers: { 'Authorization': 'Basic ZTFjYTExZDMxZWU5YWZlM2E0NjA0NzU4M2UxMmY2YTM6MGJiZjdkOGMzYTM2MDMyMjJlZjQwNTVlYWIyNDcwMTU='}
        };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    body = JSON.parse(body);
    let companies = body.data;

    let coList = companies.map((el) => {
      return [el.ticker, el.name]
    })

    //object constructor to update database

    for (var i = 0; i < coList.length; i++) {
      var coObj = {
        ticker: coList[i][0],
        company_name: coList[i][1]
      }
      //return data to the database

      queries.updateTickers(coObj, (req, res, next) => {
        if (error) throw new Error(error);
        let returnObj = {};
        returnObj.message = 'Data succesfully added!';
      })
    }
  });
