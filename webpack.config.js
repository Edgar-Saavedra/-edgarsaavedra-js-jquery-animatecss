const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const config = {
    entry: {
        'dist.min.1.x' : './src/1.x/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: "[name].js"
    },
    externals: {
        'jquery': '$'
    },
    plugins: [
        new UglifyJSPlugin({
            uglifyOptions: {
                //mangle: false,
                output: {
                    comments: false,
                    beautify: false,
                },
                //compress: {...options},
                warnings: false
            }
        })
    ],
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
