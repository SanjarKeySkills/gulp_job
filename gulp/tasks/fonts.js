import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import path from 'path';

export const otfToTtf = () => {
	// looking for fonts .otf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			}))
		)
		// converting to ttf
		.pipe(fonter({
			formats: ['ttf']
		}))
		// Upload to initial folder
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
	// looking for fonts .ttf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			}))
		)
		// converting to woff
		.pipe(fonter({
			formats: ['woff']
		}))
		// Upload to initial folder
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		// looking for fonts .ttf
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		// converting to woff2
		.pipe(ttf2woff2())
		// Upload to result folder
		.pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontsStyle = () => {
	// the fonts activating style file
	let fontsFile = `${app.path.srcFolder}/scss/font.scss`;
	// cheking out for existing of font files
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			// Cheking out is there any files for existing of connecting styles
			if (!fs.existsSync(fontsFile)) {
				// If it does not exist than...
				fs.writeFile(fontsFile, '', cd);
				let newFileOnly;
				for (var i = 0; i < fontsFiles.length; i++) {
					// Recording of the fonts connection into style file
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase () === 'heavy') {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}
						fs.appendFile(fontsFile,
							`@font-face {
								font-family: ${fontName};
								font-display: swap;
								src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff"); 
								font-weight: ${fontWeight};
								font-style: normal;
							}\r\n`,	cb);
						newFileOnly = fontFileName;
					}
				}
			} else {
				// If the file exists - report message
				console.log("The scss/fonts.scss  file is already exists.")
			}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
	function cd() { }
}