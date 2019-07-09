var path = require( "path" );

const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {

    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    // entry: {
    //     index: './index.js'
    // },

    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        port: 9000
    },

    output: {
        path: "/dist",
        publicPath: "/dist"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["@babel/preset-env"] }
                }
            },
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "stylus-loader" // compiles Stylus to CSS
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin( {
            template: './index.html'
        } ),
    ]
};