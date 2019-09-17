const { CheckerPlugin } = require('awesome-typescript-loader');

const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === "prod";

var config = {
    devtool: "source-map",
    entry: [
        "./src/app.ts",
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                include: /\.(js|jsx|tsx|ts)$/,
                sourceMap: true,
                terserOptions: {
                    output: {
                        comments: /^\**!|@preserve|@license|@cc_on/i,
                    },
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/,
            },
            {
                "enforce": "pre",
                "test": /\.js$/,
                "loader": "source-map-loader",
            }
        ],
    },
    output: {
        filename: isProduction ? "main.[hash].js" : "main.js",
        path: __dirname + "/dist",
    },
    plugins: [
        new CheckerPlugin()
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", "json"],
    },
    target: "web",
};

module.exports = config;
