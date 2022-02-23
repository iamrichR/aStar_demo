// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const isProduction = process.env.NODE_ENV == "production";

const config = {
    entry: "./src/App.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        library: "App",
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
            {
                test: /\.(js|jsx)$/i,
                loader: "babel-loader",
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    // resolve: {
    //     fallback: {
    //         assert: false,
    //         buffer: false,
    //         console: false,
    //         constants: false,
    //         crypto: false,
    //         domain: false,
    //         events: false,
    //         http: false,
    //         https: false,
    //         os: false,
    //         path: false,
    //         fs: false,
    //         punycode: false,
    //         process: false,
    //         querystring: false,
    //         stream: false,
    //         string_decoder: false,
    //         sys: false,
    //         timers: false,
    //         tty: false,
    //         url: false,
    //         util: false,
    //         vm: false,
    //         zlib: false,
    //     },
    // },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
