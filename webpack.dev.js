const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000',
        },
        historyApiFallback: {
            index: '/'
        }
    },
});