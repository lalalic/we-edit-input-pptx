const path = require('path');
const HtmlWebpackPlugin=require("html-webpack-plugin")

module.exports=(base, packages)=>{
	return {
		...base,
		entry:"./.dev.js",
		module:{
			rules:[{
					test: /\.dev\.js?$/,
					use: ['babel-loader'],
				},
				...base.module.rules
			]
		},
		devtool: 'source-map',
		plugins:[
			new HtmlWebpackPlugin({
				title:"test"
			})
		],
		devServer:{
			contentBase: path.join(__dirname, "__tests__"),
			compress: true,
			port: 9091,
			host:"0.0.0.0",
			//disableHostCheck:true,
			inline:true,
			hot:false,
		}
	}
}
