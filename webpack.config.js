const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.ts',
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.glsl$/i,
        use: [
          'raw-loader',
          'glslify-loader',
          'glsl-module-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
  devServer: {
    port: 8080,
    hot: true,
  },
};
