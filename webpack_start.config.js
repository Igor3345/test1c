const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack-base.config');

const commonConfig = {
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, ''),
        publicPath: '/local/templates/main/',
    },
};

module.exports = mode => {
    if (mode === 'production') {
        return merge(commonConfig, baseConfig(mode), {mode})
    }

    return merge(commonConfig, baseConfig(mode), {mode})
};
