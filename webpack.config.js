const path = require('path');
const htmlwebplugin = require('html-webpack-plugin');


module.exports ={

  entry: ['babel-polyfill', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename:'js/bundle.js'
  },
  devServer:{
    contentBase:"./dist"
  },
  plugins: [
    new htmlwebplugin({
      filename:'index.html',
      template:'./src/index.html'
    })
  ],
  module: {
     rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:{
          loader: 'babel-loader'
        }
      }
    ]
  }

};
