//$Подключение файлов. (START)
//! (START)
import gulp from "gulp"; // Подключаем gulp
import { path } from "./gulp/config/path.js"; //Импортируем файл path.js
import { plugins } from "./gulp/config/plugins.js" //Импортируем файл plugins.js
//! (END)
//$Подключение файлов. (END)


//$Создаем глобальную переменную (START)
//! (START)
//Присваиваем ип значение импортированнных файлов.
global.app = {
  gulp: gulp,
  path: path,
  plugins: plugins,
}
//! (END)
//$Создаем глобальную переменную (END)


//$Импортируем задачи (START)
//! (START)
import { copy } from "./gulp/tasks/copy.js"; //Шаблон
import { cmdReset } from "./gulp/tasks/reset.js";
import { cmdHtml } from "./gulp/tasks/html.js";
import { cmdScss } from "./gulp/tasks/scss.js";
import { cmdJavaScript } from "./gulp/tasks/script.js";
import { startLive } from "./gulp/tasks/server.js";
import { cmdSvgSprite } from "./gulp/tasks/svgSprite.js";
import { zipCMD } from "./gulp/tasks/zip.js";
import { cmdImages } from "./gulp/tasks/images.js";
import { cmdFonts, fontsStyle } from "./gulp/tasks/fonts.js";
// import { otfToTtf, ttfToWoff} from "./gulp/tasks/fonts.js";
//! (END)
//$Импортируем задачи (END)


//$Наблюдаем за изменениями в файлах (START)
//! (START)
//Пишем путь за файлом которым наблюдаем, подключаем выполняемую задачу
function watcher() {
  gulp.watch(path.watch.files, copy)
  gulp.watch(path.watch.html, cmdHtml)
  gulp.watch(path.watch.scss, cmdScss)
  gulp.watch(path.watch.js, cmdJavaScript)
  gulp.watch(path.watch.images, cmdImages)
}
//! (END)
//$Наблюдаем за изменениями в файлах (END)


//$ Экспорт отдельных задач (START)
//! (START)
export { cmdSvgSprite }; //gulp cmdSvgSprite
export { cmdFonts }; // gulp cmdFonts
export { createZip };//gulp createZip
//! (END)
//$ Экспорт отдельных задач (END)


//$Построение сценариев (START)
//! (START)
const fonts = gulp.series(cmdFonts, fontsStyle); // or const fonts = gulp.series(otfToTtf, ttfToWoff);
const mainTasks = gulp.series(fonts, gulp.parallel(copy, cmdHtml, cmdScss, cmdJavaScript, cmdImages));//OR const mainTasks = gulp.parallel(copy, cmdHtml, cmdScss, cmdJavaScript, cmdImages); 
const developer = gulp.series(cmdReset, mainTasks, gulp.parallel(watcher, startLive));// OR const dev = gulp.series(cmdReset, copy, watcher); 
const createZip = gulp.series(cmdReset, mainTasks, zipCMD); //Создание zip
//! (END)
//$Построение сценариев (END)


//$Выполняем сценарий по умолчанию (START)
//! (START)
gulp.task('default', developer);  //or gulp.task('anyName', dev);
//! (END)
//$Выполняем сценарий по умолчанию (END)

