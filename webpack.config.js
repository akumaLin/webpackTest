var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('css/index.css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app: __dirname + "/src/js/index.js",
        v: ['jquery']
    },
    output: {
        path: __dirname + '/assets',
        filename: "js/index.js",
           publicPath:"http://192.168.31.113:1278/assets"
    },
    module: {
        loaders: [

            {//编译ES6配置
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,//不需要编译的地方
                use: 'babel-loader',
                /* query: {
                 presets: ['es2015']
                 }*/
            },
            {
              test:/\.html$/,
                loader:"html-loader"
            },
            {//单独打包CSS配置
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.png|\.jpg|\.jpeg$/,
                loader: 'url-loader?limit=9000&name=/images/[hash:8].[name].[ext]'
            }

        ]

    }
    ,
    devServer: {
        contentBase: "./",
        host: '192.168.31.113',
        port: '1278',
    },
    plugins: [
        extractCSS,
        new HtmlWebpackPlugin(
            {
                title: 'lyx',
                filename: '../index.html',
                template: __dirname + '/src/tpl/div.html',
                inject: 'body',
                info: 'nihao'/*//尽量不要在这定义，会变慢，尽量在模板里完成*/
            }
        ),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        //压缩js文件，不过似乎直接命令行webpack就有压缩效果。没必要这个。当webpack -p不起作用再加这个
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),//提取公共js模块
        new webpack.optimize.CommonsChunkPlugin({name: 'v', filename: 'lib/jquery.min.js'})
    ],//公共js模块名
    externals: {
        jpuery: "http://libs/baidu.com/jquery/1.9.0/jquery.min.js"
    },//连接到地址
    /*   watch:true
     */
   /* resolve:{
        root :'E:/resolve',
        extensions:['','.js'],
        alias:{
            appAdd:'add.js'
        }
    }*/
}
if(process.env.NODE_ENV ==='dev'){
    //开发环境
    console.log('开发环境');
    module.exports.watch = true;
    module.exports.resolve={

    }
}else{
    //生产环境
    console.log('生产环境')
}