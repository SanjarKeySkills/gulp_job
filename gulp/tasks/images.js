import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {   //this is function
	return app.gulp.src(app.path.src.images) //getting access to the necessary file, making mapping for the sourcefile
		.pipe(app.plugins.plumber( //errors processing at compilation process
			app.plugins.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			}))
		)
	.pipe(app.plugins.newer(app.path.build.images))// the pictures are checked pit in the folder with results
	////
	.pipe(
		app.plugins.if(
			app.isBuild,
			webp()
		)
	)
	.pipe(
		app.plugins.if(
			app.isBuild,
			app.gulp.dest(app.path.build.images)
		)
	)
	.pipe(
		app.plugins.if(
			app.isBuild,
			app.gulp.src(app.path.src.images)
		)
	)
	.pipe(
		app.plugins.if(
			app.isBuild,
			app.plugins.newer(app.path.build.images)
		)
	)
	.pipe(
		app.plugins.if(
			app.isBuild,
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
	)
	////
	.pipe(app.gulp.dest(app.path.build.images)) //results folder and reload browser
	.pipe(app.gulp.src(app.path.src.svg))
	.pipe(app.gulp.dest(app.path.build.images))
	.pipe(app.plugins.browsersync.stream());
} // сжимать изображение, оптимизировать, автоматически создавать формат webp