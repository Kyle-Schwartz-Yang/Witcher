//$Подключение плагинов (START)
//*Група 1
import dartSass from "sass"; //Подключаем установленый плагин
import gulpSass from "gulp-sass"; // Подлключаем установленный плагин
import rename from "gulp-rename"; //Плагин меняет имя на .min.css
//*Група 1
import cleanCssMin from "gulp-clean-css"; // Сжимает наш css
import webpcss from "gulp-webpcss"; // Подключаем картинки в формате webp
import autoprefixer from "gulp-autoprefixer"; //Проставляет вендорные префиксы
import groupCssMediaQueries from "gulp-group-css-media-queries"; //Групирует медиа-запросы
//*Используются модули из plugins
//$Подключение плагинов (END)

const sass = gulpSass(dartSass); //Объединяем gulp-sass и sass

//$Функция (START)
//Вывод ошибки, scss, группа media, вкл webp, замена пути(@img), авто-префикс, cжать, меняем имя (min.css), stream
export const cmdScss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: true })
    //sourcemaps: true позволяем видеться в каком именно файле scss была ошибка
    //*Плагин plumber + notify (START)
    .pipe(app.plugins.plumber( //Настрока сообщения об ошибке plumber + notify
      app.plugins.notify.onError({
        title: "SCSS",
        message: "Обнаружен ERROR--->: <%= error.message %>"
      }))
    )
    //*Плагин plumber + notify (END)

    //*Плагин sass (START)
    .pipe(sass({
      outputStyle: 'expanded' // Какие-то параменты
    }))
    //*Плагин sass (END)

    .pipe(groupCssMediaQueries()) //Групирем медиа-запросы

    // //*Плагин gulp-webpcss (START)
    // .pipe(webpcss({
    //   webpClass: ".webp", //Добавление для body класс если поддержуется webp
    //   noWebpClass: ".no-webp"//Добавление для body класс если не поддержуется webp
    // }))
    //*Плагин gulp-webpcss (END)

    .pipe(app.plugins.replace(/@img\//g, '../img/')) //замены пути @img

    //*Плагин gulp-autoprefixer (START)
    .pipe(autoprefixer({
      grid: true, // вкл Работа с гридами 
      overrideBrowserslist: ["last 5 versions"],//Поддержка 5 версий назад
      cascade: true
    }))
    //*Плагин gulp-autoprefixer (END)

    .pipe(app.gulp.dest(app.path.build.css)) // раскоментируй если тебе нужен не сжатый дубль(style.css)
    .pipe(cleanCssMin()) //Сжимает файл .min.css

    //*Плагин gulp-rename (START)
    .pipe(rename( //меняем имя сжатого файла
      { extname: ".min.css" }
    ))
    //*Плагин gulp-rename (END)
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream()) //StartliveBrowser
}
//$Функция (END)