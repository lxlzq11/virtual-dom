// import webpack from 'webpack';
// import path from 'path';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
// import CleanWebpackPlugin from 'clean-webpack-plugin';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';
var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');


const currentPath = process.cwd();

var conf = {
    watch: true,
    alias: {
        "vdom": "./test/test.js" 
    },
    plugins:[
        new CleanWebpackPlugin(['dist'],{
            root: currentPath,  // 一个根的绝对路径, [webpack.config的地址]
            verbose: true,      // 将log写到 console.
            dry: false,         // 不要删除任何东西，主要用于测试.
            exclude: ['']       //排除不删除的目录，主要用于避免删除公用的文件
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            vdom: 'vdom'
        }),
        new CopyWebpackPlugin([
            {
                from: 'index/index.html',
                to: 'index.html'
            }
        ]),
        new ExtractTextPlugin('[name].css'),
        new WebpackNotifierPlugin({
            title: 'Webpack 编译成功',
            // contentImage: path.resolve(process.cwd(), './global/img/logo.png'),
            alwaysNotify: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity
        })
    ],
    entry: {
        common: ['react','vdom','./virtual/index.js']
    },
    output: {
        path: path.resolve(currentPath,'dist/'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(js)|(jsx)$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            { 
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style","css")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style","css!less")
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract("style","css!sass")
            },
            {
                test: /\.html$/,
                loaders: 'html'
            }
        ]
    }


}

module.exports = conf;