var webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	NunjucksWebpackPlugin = require('nunjucks-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	fs = require('fs');var controllers = fs.readdirSync(__dirname)
  Dotenv = require('dotenv-webpack');


/* babel */
const babelSettings = JSON.parse(fs.readFileSync(".babelrc"));
/* read templates */
var templates = fs.readdirSync(path.resolve(__dirname, 'src/tpl/pages/'));
var tpls=[];
for (var i = 0; i < templates.length; i++) {
	file = templates[i];
	templateName = file.split('.')[0];
	tpls.push({from: path.resolve(__dirname, 'src/tpl/pages/'+file),to:templateName+'.html'});
}
module.exports = {
	entry: {
    tpl: './src/tpl.js',
		app: './src/main.jsx',
		index: './src/scripts/index.js',
    documentos: './src/scripts/documentos.js',
    novedades: './src/scripts/novedades.js',
    normas: './src/scripts/normas.js'
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
		inline: true,
		proxy: [{
            path: `http://sinia.minam.gob.pe/`,
            target: 'http://sinia.minam.gob.pe/',
            secure: false
        }],
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
                loader: 'nunjucks-loader'
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
			{from: 'public/*.html', to: '/'},
			{
                context: 'public',
                from: '**/*',
                to: '/'
            },

		]),
     new Dotenv({
          path: './.env',
          safe: false
        }),

	],
	devtool: "source-map"
};
