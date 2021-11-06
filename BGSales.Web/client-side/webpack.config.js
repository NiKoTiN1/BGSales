var path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: "source-map",
 
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    // devServer: {
    //   historyApiFallback: true,
    //   port: 8081,
    //   proxy: {
    //     '/api/**': {
    //       target: 'https://localhost:5001',
    //       secure: false,
    //       changeOrigin: true
    //     },
    //   },
    // },
    module: {
        rules: [
            { test: /\.tsx?$/, use: "ts-loader"},
            { test: /\.js$/, use: "source-map-loader" },
            {test: /\.css$/, use: ["style-loader", "css-loader"]},
            {
                test: /\.html$/,
              loader: 'html-loader',
            },
            {
                test: /\.scss$/,
                  use: [{
                    loader: "style-loader"
                  }, {
                    loader: "css-loader" 
                  }, {
                    loader: "sass-loader"
                  }]
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset',
            },
        ],
        
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
  
};