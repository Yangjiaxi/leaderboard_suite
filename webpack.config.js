const path = require("path");

const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/client.js",
    mode: process.env.NODE_ENV || "development",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/",
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
        ],
    },
    plugins: [
        new CompressionPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: "./templates/images",
                    to: path.join(path.resolve(__dirname, "build"), "images"),
                },
            ],
        }),
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
};
