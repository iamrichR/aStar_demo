const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: 'App',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
