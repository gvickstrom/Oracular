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
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
};
