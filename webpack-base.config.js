const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const commonConfig = {
    entry: {
        template: './src/js/template'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-syntax-dynamic-import']
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    plainSprite: true,
                    extract: true,
                    outputPath: './images/',
                    publicPath: './images/',
                    spriteFilename: 'sprite_build.svg'
                }
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'template_styles.css'
        }),
        new SpriteLoaderPlugin()
    ]
}

const productionConfig = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
}

const developmentConfig = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')()
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ],

    devtool: 'cheap-module-eval-source-map',

    watchOptions: {
        aggregateTimeout: 0
    },
}

module.exports = mode => {
    if (mode === 'production') {
        return merge(commonConfig, productionConfig)
    }

    return merge(commonConfig, developmentConfig)
};