const path = require('path');

module.exports = {
    entry: './src/client.js',
    mode: process.env.NODE_ENV || 'development',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
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
                    }
                }
            },
        ],
    },
};
