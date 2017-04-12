var webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	NunjucksWebpackPlugin = require('nunjucks-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	fs = require('fs');var controllers = fs.readdirSync(__dirname);


/* read templates */
var templates = fs.readdirSync(path.resolve(__dirname, 'src/tpl/pages/'));
var tpls=[];
for (var i = 0; i < templates.length; i++) {
	file = templates[i];
	templateName = file.split('.')[0];
	tpls.push({from: path.resolve(__dirname, 'src/tpl/pages/'+file),to:templateName+'.html'});
}
/* babel */
const babelSettings = JSON.parse(fs.readFileSync(".babelrc"));

module.exports = {
	entry: {
		app: './src/main.jsx',
		pageIndex: './src/page-index.js',
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].[ext]'
	},
	resolve: {
		extensions: ['.jsx', '.js','.njk']
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
		host: '0.0.0.0',
		port: 8000,
		inline: true
	},
	module: {
		loaders: [
			{
				test: /(\.js|.jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: babelSettings
			},
			{
                test: /\.(njk|nunjucks)$/,
                loader: 'nunjucks-loader',
				query: {
					root: __dirname + '/src/tpl',
                    quiet: true
                }
            },
			{
    			test: /\.njk$/,
    			loader: 'file?context=' + __dirname + '/src/tpl' + '&name=[path][name].html!nunjucks-html?' +
				JSON.stringify({
				'searchPaths': [
					'/src/tpls/pages'
				]
    			})
}
		]
	},
	externals: {
		"jquery": "jQuery"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/visor.html'),
			hash: true,
			chunks: ['app'],
			filename: 'visor.html',
			inject: 'body'
		}),

		new NunjucksWebpackPlugin({
			template: tpls
		}),
		
	
		new CopyWebpackPlugin([
			{from: 'public/visor', to: 'visor'},
			{from: 'public/web', to: 'web'},
			{from: 'public/manifest.json', to: 'manifest.json'},
			{from: 'public/sw.js', to: 'sw.js'},
			 {
                context: 'public/',
                from: '**/*',
                to: '/'
            },
		]),

	],
	devtool: "source-map"
};
