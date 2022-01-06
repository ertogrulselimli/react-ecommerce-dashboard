const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
    return {
        mode: 'production',
        entry: {
            app: './client/index.js'
        },
        output: {
            path: path.resolve('dist'),
            filename: '[name].[hash].js',
            chunkFilename: '[name]-[hash].js',
            publicPath: '/'
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader'
                    },

                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/, use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    "css-loader"
                ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it use publicPath in webpackOptions.output
                                publicPath: '../'
                            }
                        },
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, use: 'file-loader'},
                {test: /\.(jpg|jpeg|gif|png)$/, use: 'file-loader', exclude: /node_modules/}
            ]
        },
        plugins: [
            new CleanWebpackPlugin('dist'),
            new webpack.optimize.SplitChunksPlugin({
                name: 'vendor',
                minChunks: Infinity,
                filename: '[name].[hash].js'
            }),

            new HtmlWebpackPlugin(
                {
                    template: './client/index.html',
                    inject: 'body'
                }
            ),


            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),

            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production'),
                    'API_URL': JSON.stringify('http://localhost:8080/ecommerce-admin/api/'),
                    'SOCKET_URL': JSON.stringify('http://localhost:8080/ecommerce-admin/product-unapprove-count'),
                    'HOST': JSON.stringify('localhost:4000')
                }
            }),

        ],

        optimization: {
            minimizer: [
                // we specify a custom UglifyJsPlugin here to get source maps in production
                new UglifyJsPlugin({
                    parallel: true,
                    uglifyOptions: {
                        output: {
                            comments: false
                        }
                    },
                    sourceMap: false
                })
            ],
            splitChunks: {
                // include all types of chunks
                chunks: 'all'
            }
        },
    }

};
