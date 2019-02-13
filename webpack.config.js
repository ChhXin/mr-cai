const path = require('path');

module.exports = {
  mode: 'development',
  devtool: '(none)',
  entry: {
    options: './app/options/index',
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/dist/'
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        loader: "babel-loader", //use 简写
        options: {
          presets: ["env", "stage-0", 'react'],
          plugins: [
            ['import', [{ libraryName: "antd", style: 'css' }]],
          ]
        }
      },
      {//css处理
        test: /\.css$/,
        loader: "style-loader!css-loader?modules",
        exclude: /node_modules/,
      },
      {//antd样式处理
        test: /\.css$/,
        exclude: path.resolve(__dirname, "app"),
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {//less处理
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
          options: {
            javascriptEnabled: true,
          }
        }]
      },
      {//图像字体文件处理
        test: /\.(png|jpg|gif|ttf|eot|svg|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          name: '[path][name].[ext]&limit=200000'
        }
      }
    ]
  },
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: 'options.html'
    },
    disableHostCheck: true,
    index: 'options.html',
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    https: false, 
  },
};