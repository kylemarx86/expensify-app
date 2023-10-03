const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
          test: /\.js$/,  
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }, {
          test: /\.s?css$/,
          use: [{
            loader: MiniCssExtractPlugin.loader, 
          }, {
            loader: 'css-loader',
            options: {sourceMap: true}
          }, {
            loader: 'sass-loader',
            options: {sourceMap: true}
          }]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        attributes: {
          id: 'target',
          'data-target': 'example'
        }
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    }
  };
};