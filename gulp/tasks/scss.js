import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // file compression
import webpcss from 'gulp-webpcss'; // WEBP deduction of the images
import autoprefixer from 'gulp-autoprefixer'; // Vendor prefix adding - автоматическая кроссбраузерность
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // media request grupping

const sass = gulpSass(dartSass); // делается вызов из плагина Галп сасс с передачей непосредственного компилятора

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>"
			})))
		.pipe(app.plugins.replace(/@img\//g, '../img/')) // alias processing, coming out from scss folder and entering to img folder
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpcss(
			{
				webpClass: ".webp", //if the browser supports webp images - this will work
				noWebpClass: ".no-webp" //if it will not support - then it will be with .no-webp. According to this class image will be followed
			})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: true,
					overridtBrowserlist: ["last 3 versions"],
					cascade: true
			})
			)
		)
		.pipe(app.gulp.dest(app.path.build.css)) //Раскомментировать если нужен не сжатый файл стилей
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss()
				)
			)
		.pipe(rename({
			extname: ".min.css" // Остается выгрузка двух файлов на тот случай если не отдаем сборку
		}))
		.pipe(app.gulp.dest(app.path.build.css)) //внутри задачи пайп будет пистаься компилятор
		.pipe(app.plugins.browsersync.stream());
}