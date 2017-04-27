'use strict';
var webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/javascript/index.js',
    },
    output: {
        path: __dirname + '/dist', // `dist` is the destination
        filename: 'bundle.js',
        publicPath: "/dist/",
    },
    module: {
        rules: [
        {
            test: /\.js$/, //Check for all js files
            use: [{
                loader: 'babel-loader'
            }]
        },
        {
            test: /\.(css|sass|scss)$/, //Check for sass or scss file names
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ]
        },
        { 
            test: /\.json$/, 
            loader: "json-loader"  //JSON loader
        },
        {
            test: /\.(jpg|png)$/,
            loader: "file-loader"  //JSON loader
        }
        ]
    },
    //To run development server
    devServer: {
        contentBase: __dirname,
    },
};
