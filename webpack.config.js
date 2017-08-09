const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
    entry: {
        'dist.1.9' : './src/1.9/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: "[name].js"
    },
    externals: {
        'jquery': '$'
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                //https://stackoverflow.com/questions/39853646/how-to-import-a-css-file-in-a-react-component
                test: /\.css$/,
                loader: "style-loader!css-loader",
                options: {
                    minimize: true || {/* CSSNano Options */}
                }
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'],
                    //presets: ['es2015'],
                    cacheDirectory: true
                }
            }
        ]
    }
};

module.exports = config;
