const path = require('path');

module.exports = {
    entry: {
        main: path.join(__dirname, "Scripts/App", "Index.tsx"),
        extension: path.join(__dirname, "Scripts/Extension", "Index.tsx"),
        context: path.join(__dirname, "Scripts/Framework", "AppContext.tsx"),
        config: path.join(__dirname, "Scripts/Framework", "AppConfig.tsx"),
    },
    output: {
        path: path.resolve(__dirname, "wwwroot"),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
                        sourceType: 'unambiguous'
                    }
                }
            },
            {
                test: /\.(less|css)$/i,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            }
                        }
                    }
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less']
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    watch: true,
    mode: 'development',
    devtool: "eval-source-map",

}