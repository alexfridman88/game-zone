const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/', // Ensure this is set correctly
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: 'html-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body', // Inject scripts into the body
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                { from: 'src/favicon.ico', to: '' },
            ],
        }),
    ],
    devServer: {
        watchFiles: {
            paths: ['./src/**/*'],
        },
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
        open: false,
    },
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    }
};
