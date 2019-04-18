const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';//开发模式
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index: './index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd", // 通用模块定义
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.less$/,
                use: [
                    // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }, {
                test: /\.css$/,
                oneOf: [
                    {
                        resourceQuery: /module/, // foo.css?inline
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    localIdentName: '[local]_[hash:base64:5]'
                                },
                            },
                            'postcss-loader'
                        ]
                    }, {
                        use: [
                            'style-loader',
                            'css-loader',
                            'postcss-loader'
                        ]
                    }

                ],

            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    outputPath: 'fonts'
                }
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /test\.js$/,
                use: 'mocha-loader',
                exclude: /node_modules/,
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            { from: 'src/ali_font', to: 'fonts/' }
        ]),
        new HtmlWebpackPlugin({
            title: 'Output Page',
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        port: 9986,
        open: true
    }
};