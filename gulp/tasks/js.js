import webpack from "webpack-stream";

export const js = () => {   //this is function
	return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev }) //getting access to the necessary file, making mapping for the sourcefile
	.pipe(app.plugins.plumber( //errors processing at compilation process
		app.plugins.notify.onError({
			title: "JS",
			message: "Error: <%= error.message %>"
		}))
	)
	.pipe(webpack({
		mode: app.isBuild ? 'production' : 'development',
		output: {
			filename: 'app.min.js',
		}
	}))
	.pipe(app.gulp.dest(app.path.build.js)) //results folder and reload browser
	.pipe(app.plugins.browsersync.stream());
}