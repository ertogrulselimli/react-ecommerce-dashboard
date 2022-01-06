const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    return {
        mode: 'development',
        entry: {
            app: './client/index.js',
            vendor: [
                'react',
                'react-dom',
                'react-router',
                'redux'
            ]
        },
        output: {
            path: path.resolve('dist'),
            filename: '[name].[hash].js',
            chunkFilename: '[name]-[hash].js',
            publicPath: '/'
        },

        devServer: {
            port: 4000,
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                "react-hot-loader/babel"
                            ]
                        }
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
                {test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, use: 'file-loader'},
                {test: /\.(jpg|jpeg|gif|png)$/, use: 'file-loader', exclude: /node_modules/}
            ]
        },
        plugins: [
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
                    'NODE_ENV': JSON.stringify('development'),
                    'API_URL': JSON.stringify('http://localhost:8080/ecommerce-admin/api/'),
                    'SOCKET_URL': JSON.stringify('http://localhost:8080/ecommerce-admin/product-unapprove-count'),
                    'HOST': JSON.stringify('localhost:4000')
                }
            })
        ]
    }

};
