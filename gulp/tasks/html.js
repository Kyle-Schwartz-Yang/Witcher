//$Подключение плагинов (START)
import fileinclude from "gulp-file-include"; //Собирает куски кода в файл index.html
import versionNumber from "gulp-version-number"; //Исправляет проблемы с кешированием(устанавливает дату)
//? import webpHtmlNosvg from "gulp-webp-html-nosvg"; // оборачивает тег <picture><img></picture>
//*Используются модули из plugins
//$Подключение плагинов (END)


//$Функция (START)
//Описание: Сообщение об ошибке,Собирает куски кода,Фикс кеширования, StartLiveBrowser
export const cmdHtml = () => {
  return app.gulp.src(app.path.src.html)
    //*Плагин plumber + notify (START)
    .pipe(app.plugins.plumber( //Настрока сообщения об ошибке plumber + notify
      app.plugins.notify.onError({
        title: "HTML",
        message: "Обнаружен ERROR--->: <%= error.message %>"
      }))
    )
    //*Плагин plumber + notify (END)
    .pipe(fileinclude()) //Собирает куски html
    .pipe(app.plugins.replace(/@img\//g, 'img/')) // меняет путь @img
    //? .pipe(webpHtmlNosvg()) 
    //*Плагин gulp-version-number (START)
    .pipe(versionNumber({ //Решаем проблему с кешириванием
      'value': '%DT%',
      'append': {
        'key': '_v',
        'cover': 0,
        'to': [
          'css',
          'js',
        ]
      },
      'output': {
        'file': 'gulp/version.json'
      }
    }))
    //*Плагин gulp-version-number (END)
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream()) // StartLiveBrowser
}
//$Функция (END)
