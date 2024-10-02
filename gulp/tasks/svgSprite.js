//$Подключение плагинов (START)
import svgSprite from "gulp-svg-sprite";
//*Используются модули из plugins
//$Подключение плагинов (END)

//$Функция (START)
//На выходи получим 2 папки (icon/sprite.svg+stack/sprite.stack.html)
export const cmdSvgSprite = () => {
  return app.gulp.src(app.path.src.svgicons) //.source/svgicons/*
    //*Плагин plumber + notify (START)
    .pipe(app.plugins.plumber( //Настрока сообщения об ошибке
      app.plugins.notify.onError({
        title: "svg-error",
        message: "Обнаружен ERROR--->: <%= error.message %>"
      })))
    //*Плагин plumber + notify (START)

    //*Плагин gulp-svg-sprite (START)
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: `../icon/sprite.svg`, //Путь к созданию Файла (.dist/img/icon/sprite.svg)

          example: true, //Создавать страницу с перечнем иконок(true/false)
        }
      }
    }))
    //*Плагин gulp-svg-sprite (END)
    .pipe(app.gulp.dest(app.path.build.images)) //.dist/img/
}
//$Функция (End)