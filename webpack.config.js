const path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development'
});

const sourcePath = 'client/src/',
        distPath = 'client/dist/';

module.exports = {
    entry: [
        './' + sourcePath + 'index.tsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        contentBase: path.join(__dirname, distPath),
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({template: sourcePath + 'index.html'}), new ExtractTextPlugin("boundle.css")
    ]
};