const path=require("path")

module.exports=(env,args)=>{
	const base={
		entry:"./src/index.js",
		output:{
			filename:"[name].js",
			path:path.resolve(__dirname, 'dist')
		},
		module:{
			rules:[{
				test: /\.js?$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
				include: /src/
			},{
				test: /\.js?$/,
				use: ["transform-loader/cacheable?brfs"],
				enforce:"post",
				include: /(linebreak|unicode-properties|fontkit|pdfkit)/
			}]
		},
		resolve:{
			symlinks:false,
		},
		plugins:[],
		node:{
			fs: "empty",
			stream: true,
		},
		stats:"errors-only",
	}

	if(env){
		return require(`./webpack.${env}.js`)(base)
	}

	return base
}
