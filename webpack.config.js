var webpack=require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('css/index.css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports ={
    entry :__dirname + "/src/js/index.js",
    output:{
        path:__dirname + '/assets',
        filename:"js/index.js",
     /*   publicPath:"/temp/"*/
    },
    module:{
        rules:[

            {//编译ES6配置
			  test: /\.js$/,
			  exclude: /(node_modules|bower_components)/,//不需要编译的地方
			  use: 'babel-loader',
			 /* query: {
				presets: ['es2015']
			  }*/
			},
            {//单独打包CSS配置
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
				  fallback: "style-loader",
				  use: "css-loader"
				})
			 }

        ]

    }
    ,
    devServer:{
        contentBase:"./",
        host:'192.168.31.113',
        port:'1278',
    },
    plugins:  [
		extractCSS,
        new HtmlWebpackPlugin(
            {
                title: 'lyx',
                filename: '../index.html',
                template:__dirname + '/src/tpl/div.html',
                inject:'body',
                info:'nihao'/*//尽量不要在这定义，会变慢，尽量在模板里完成*/
            }
        ),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })//压缩js文件，不过似乎直接命令行webpack就有压缩效果。没必要这个。当webpack -p不起作用再加这个
    ],
    watch:true

}