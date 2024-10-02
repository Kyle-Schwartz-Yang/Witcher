//$Подключение плагинов (START)
//? import webp from "gulp-webp"; //Не удалось установить(конверт.в webp)
// import imagemin from "gulp-imagemin"; //Сжимаем наши картинки.
import tinypng from "gulp-tinypng-compress"; //Cжатие изображения
//*Используются модули из plugins
//$Подключение плагинов (END)


//$Функция (START)
// экспорт image в dist + настройка.
export const cmdImages = () => {
  return app.gulp.src(app.path.src.images)
    //*Плагин plumber + notify (START)
    .pipe(app.plugins.plumber( //Настрока сообщения об ошибке
      app.plugins.notify.onError({
        title: "IMAGE-error",
        message: "Обнаружен ERROR--->: <%= error.message %>"
      })))
    //*Плагин plumber + notify (END)
    .pipe(app.plugins.newer(app.path.build.images)) //Наблюдает за файлами 
    //? .pipe(webp()) не удалось установить
    //*gulp-imagemin (START)
    // .pipe(imagemin({
    //   progressive: true,
    //   svgoplugins: [{ removeViewBox: false }],
    //   interlaced: true,
    //   optimizationLevel: 3,
    // }))
    //*gulp-imagemin (END)
    .pipe(app.gulp.dest(app.path.build.images))
    //*gulp-tinypng-compress

    .pipe(tinypng({
      key: 'pvqpnx6Hs7jgt1lfPjf4bVndcX0sW9YS',
      sigFile: 'source/img/.tinypng-sigs',
      log: true
    }))
    //*gulp-tinypng-compress
    .pipe(app.plugins.newer(app.path.build.images))
    // .pipe(app.gulp.dest(app.path.build.images)) //$Выгрука 2 
    .pipe(app.gulp.src(app.path.src.svg)) //выгружаем svg в папку dist
    .pipe(app.gulp.dest(app.path.build.images)) //Последняя выгрузка
    .pipe(app.plugins.browserSync.stream())
}
//$Функция (END)


