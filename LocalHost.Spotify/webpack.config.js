const path = require('path');

module.exports = {
    entry: path.join(__dirname, "Scripts", "index.js"),
    output: {
        path: path.resolve(__dirname, "wwwroot"),
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
        ]
    },
    watch: true
}