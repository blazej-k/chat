const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')


module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv(),
        new ErrorOverlayPlugin()
    ],
    devServer: {
        compress: true,
        port: 8000,
        hot: true,
        overlay: true,
        open: true,
        contentBase: path.join(__dirname, 'src'),
        historyApiFallback: true,
    }
}