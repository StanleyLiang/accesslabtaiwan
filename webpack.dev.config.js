const webpack = require('webpack');
const path = require('path');

const babelSettings = {
    cacheDirectory: true
};

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: '0.0.0.0',
        hot: true,
        publicPath: '/static/build/'
    },
    watch: true,
    watchOptions: {
        poll: 1000
    },
    entry: {
        landing: './src/landing.jsx'
    },
    output: {
        path: path.join(__dirname, '/static/build/'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.j(s|sx)/,
                use: `babel-loader?${JSON.stringify(babelSettings)}`
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css', '.scss']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};