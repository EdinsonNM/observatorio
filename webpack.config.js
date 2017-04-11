var webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	NunjucksWebpackPlugin = require('nunjucks-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin')
fs = require('fs');

/* babel */
const babelSettings = JSON.parse(fs.readFileSync(".babelrc"));

module.exports = {
	entry: {
		app: './src/main.jsx',
		'page-index': './src/page-index.js',
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.jsx', '.js']
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
                    root: __dirname + '/public/tpl'
                }
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
	        template: {
	            from: path.resolve(__dirname, 'public/tpl/index.tmpl.njk'),
	            to: 'index.html'
	        }
	    }),
	    new NunjucksWebpackPlugin({
	        template: {
	            from: path.resolve(__dirname, 'public/tpl/caracterizacion_biofisica.tmpl.njk'),
	            to: 'caracterizacion_biofisica.html'
	        }
	    }),
		new CopyWebpackPlugin([
			{from: 'public/css', to: 'css'},
			{from: 'public/fonts', to: 'fonts'},
			{from: 'public/web', to: 'web'},
			{from: 'public/images', to: 'images'},
			{from: 'public/js', to: 'js'},
			{from: 'public/manifest.json', to: 'manifest.json'},
			{from: 'public/sw.js', to: 'sw.js'}
		]),

	],
	devtool: "source-map"
};
