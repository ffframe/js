/* eslint-disable import/no-extraneous-dependencies */
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpackConfig = require('./webpack.config.base');
/* eslint-enable import/no-extraneous-dependencies */

const outputPath = path.join(process.env.PWD, 'dist');

module.exports = env => (
    webpackMerge(webpackConfig(env), {

        output: {
            path: outputPath,
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                __DEV__: JSON.stringify(false),
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new UglifyJSPlugin({
                sourceMap: true,
                uglifyOptions: {
                    beautify: false,
                    mangle: {
                        keep_fnames: true,
                    },
                    compress: {
                        warnings: false,
                    },
                    comments: false,
                },
            }),
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map',
                exclude: [/vendor\//],
            }),
        ],

        externals: [
            nodeExternals({
                whitelist: [/lodash/],
            }),
        ],

    })
);
