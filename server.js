(function() {
  'use strict';
    // *** dependencies *** //
    const express = require('express');
    const http = require('http');
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const path = require('path');
    const app = express();
    const port = process.env.PORT || '4000';

    app.set('port', port);
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    const routes = require('./config/routes/index');
    app.use('/', routes);

    const tickerRoutes = require('./config/routes/ticker');
    app.use('/Ticker', tickerRoutes);

    const filterRoutes = require('./config/routes/filter');
    app.use('/Filter', filterRoutes);

    // const kloutRoutes = require('../routes/klout');
    // const graphRoutes = require('../routes/graph');

    // *** register routes *** //
    // app.use('/klout', kloutRoutes);
    // app.use('/graph', graphRoutes);

    // // uncomment if using express-session
    // app.use(session({
    //   secret: process.env.SECRET_KEY,
    //   resave: false,
    //   saveUninitialized: true
    // }));

  // app.use(flash());
  app.use('/', express.static(path.join(__dirname, 'public')));
  app.use('*/*', express.static(path.join(__dirname, 'public')));


  const server = http.createServer(app);
  server.listen(port);
}());
