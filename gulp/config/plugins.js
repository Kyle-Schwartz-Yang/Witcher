//$Подключение установленых плагинов (START)
import replace from "gulp-replace"; //меняет пути @img -> (img/picture.jpg)
import plumber from "gulp-plumber"; //Выводит ошибку
import notify from "gulp-notify"; //Обрабатывает ошибку
import browserSync from "browser-sync"; // start Live Browser
import newer from "gulp-newer"; // фильтрации файлов и обработки только тех файлов, которые изменились.
import gulpIf from "gulp-if";
//$Подключение установленых плагинов (END)


//$ Закрываем название общих плагинов в объект (START)
export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browserSync: browserSync,
  newer: newer,
  gulpIf: gulpIf,
}
//$ Закрываем название общих плагинов в объект (END)