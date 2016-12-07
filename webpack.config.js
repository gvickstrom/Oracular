const path = require('path');

module.exports = {
    entry: ['./client/index.js'],
    output: {
      path: path.join(__dirname, 'public'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
};
