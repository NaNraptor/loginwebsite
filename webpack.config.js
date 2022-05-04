const path = require('path')

module.exports = {
  entry: {
    main: './src/client/main.js',
    //_404: './src/client/404.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'public/static/'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
}