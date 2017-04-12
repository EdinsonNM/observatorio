var nunjucksRender = require('gulp-nunjucks-render');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var path = require('path');
gulp.task('nunjucks', function() {
  return gulp.src('src/tpl/pages/**/*.+(html|njk)')
  	.pipe(nunjucksRender({
      path: ['src/tpl/layouts','src/tpl/partials']
    }))
   .pipe(gulp.dest('public'))
  pipe(livereload({ start: true }));
});

gulp.task('watch', function() {
  livereload.listen({ start: true });
  gulp.watch('src/tpl/pages/**/*.nunjucks', ['nunjucks']);
});




gulp.task('default', function() {
 	webpack();
});

gulp.task("webpack", function(callback) {
    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        /*gutil.log("[webpack]", stats.toString({
            // output options
        }));*/
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {
	let compiler = webpack(webpackConfig);
    new WebpackDevServer(compiler, {
		contentBase: path.resolve(__dirname, 'public'),
		inline: true
	}).listen(8000, "localhost", function(err) {
		
	});
});

gulp.task("build",["nunjucks"], function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);

	webpack(myConfig, function(err, stats) {
		callback();
	});
});

gulp.task('default',["nunjucks","watch"], function() {
  // place code for your default task here
});
gulp.task('server',["nunjucks","watch","webpack-dev-server"], function() {
  // place code for your default task here
});
