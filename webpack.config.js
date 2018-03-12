const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    devServer: {
        historyApiFallback: {
            index: 'index.html',
        },
        inline: true,
        contentBase: path.join(__dirname, distPath)
    },
    plugins: [
        new HtmlWebpackPlugin({template: sourcePath + 'index.html'})
    ]
};