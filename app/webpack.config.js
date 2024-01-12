const path = require("path");
const HtmlWebPack = require("html-webpack-plugin");
const webpack = require("webpack");


module.exports = {
    devServer :{
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true
    },

    resolve:{
        extensions: [".js", ".jsx", ".css"]
    },

    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },

    plugins: [
        new HtmlWebPack({
           template: "./public/index.html"
        })
    ],

    module: {
        rules: [
            // for js, jsx
            {
               test: /.(js|jsx)$/,
               exclude: /node_modules/,
               use: {
                loader : "babel-loader",
                options: {
                    presets : ["@babel/preset-env", "@babel/preset-react"]
                }
               }
            },

            //for css file
            {
                test:/.css$/,
                use: ["style-loader", "css-loader"]
            }


        ]
    }
}