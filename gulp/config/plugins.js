import replace from "gulp-replace"; // Поиск и замена
import plumber from "gulp-plumber"; // Mistakes processing
import notify from "gulp-notify"; // Messages (prompts)
import browsersync from "browser-sync"; // Local server
import newer from "gulp-newer"; // update cheking out, is the pic really was updated,
import ifPlugin from "gulp-if"; // this plugin is also valuable - and this is very important

// Экспортируем объект
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin
}
