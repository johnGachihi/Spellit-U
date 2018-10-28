const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        bundle: "./js_john/src/index.js",
        lesson: "./js_john/src/lesson/level-index.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "js_john/dist")
    },
    module: {
        rules: [
            {
                test: [/\.js$/],
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: [/\.css$/],
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            }
        ]
    }
}