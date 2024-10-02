//$Подключение плагинов (START)
import fs from "fs"; // Работа с файлами
import fonter from "gulp-fonter"; //Конвер. из otf -> ttf
import ttf2woff2 from "gulp-ttf2woff2";//Конверт. из ttf -> woff2
//*Используются модули из plugins
//$Подключение плагинов (END)

//$ Функция (START)
//Конвертируем (otf / ttf) НО сохранняем все (ttf, woff, woff2)
export const cmdFonts = () => {
  return app.gulp.src(app.path.src.fonts)
    //*Плагин plumber + notify (START)
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "fonts",
      message: "Обнаружен ERROR--->: <%= error.message %>"
    })))
    //*Плагин plumber + notify (END)
    .pipe(app.plugins.newer(app.path.build.fonts))
    .pipe(app.plugins.gulpIf(['**/*.{ttf,otf}', '!**/*.{woff,woff2}'], fonter({ formats: ['ttf', 'woff'] })))
    .pipe(app.gulp.dest(app.path.build.fonts)) //Закоментируй меня если хочешь только (woff/woff2)
    .pipe(app.plugins.newer(app.path.build.fonts))
    .pipe(app.plugins.gulpIf(['**/*.ttf', '**/*.otf'], ttf2woff2()))
    .pipe(app.gulp.dest(app.path.build.fonts));
}
//$ Функция (END)

//$Функция @font-face(maker code) (START)
// Создаем файл fonts.scss {Внутри код @font-face}
export const fontsStyle = () => {
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`; // Путь к файлу стилей подключения шрифтов

  //* add any code.
  const fontsCode = `/* @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src:
       url('../fonts/lato-v15-latin-regular.woff2') format('woff2'),
       url('../fonts/lato-v15-latin-regular.woff') format('woff');
 } */ \n\n`;
  //* add any code.
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFile) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, fontsCode, cb); // Записываем начальный код в файл
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          // Формирование кода подключения и т.д.
        }
      } else {
        console.log('Файл fonts.scss уже существует. Для обновления удалите его!')
      }
    }
  });
  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() { }
}
//$Функция @font-face(maker code (START)

