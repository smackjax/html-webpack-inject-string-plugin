const { resolve } = require("path");

module.exports = {
    entry: resolve(__dirname, "src", "index.js"),
    output: {
        path: resolve(__dirname, "build"),
        filename: "html-webpack-inject-string-plugin.js"
    },
    mode: 'production', 
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
    }
};