
//$Подключение плагинов (START)
import webpack from "webpack-stream"; //Подключаем модуль webpack 
//*Используются модули из plugins
//$Подключение плагинов (END)


//$Функция (START)
export const cmdJavaScript = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: true })
    //sourcemaps: true позволяем видеться в каком именно файле scss была ошибка
    //*Плагин plumber + notify (START)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "JavaScript",
        message: "Обнаружен ERROR--->: <%= error.message %>",
      })))
    //*Плагин plumber + notify (END)

    //*Плагин webpack-stream (START)
    .pipe(webpack({
      mode: 'production', //mode: 2 режима: production(js сжат) development(не сжимает)
      output: {
        filename: 'app.min.js', //ИМЯ СЖАТОГО ФАЙЛА
      }
    }))
    //*Плагин webpack-stream (END)

    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream()) //StartLiveBrowser
}
//$Функция (END)