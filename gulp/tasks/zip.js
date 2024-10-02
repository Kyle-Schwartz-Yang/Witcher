//$Подключение плагинов (START)
import { deleteAsync } from 'del'; // Удаление.
import zipPlugin from "gulp-zip"; //Зипирование.
//*Используются модули из plugins
//$Подключение плагинов (END)

//$Функция (START)
export const zipCMD = () => {
  deleteAsync(`./$(app.path.rootFolder).zip`); //Удаляем папку zip(Если она есть)
  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
    //*Плагин plumber + notify (START)
    .pipe(app.plugins.plumber( //Настрока сообщения об ошибке
      app.plugins.notify.onError({
        title: "ZIP",
        message: "Обнаружен ERROR--->: <%= error.message %>"
      })))
    //*Плагин plumber + notify (END)
    // .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
    .pipe(zipPlugin(`CoolShit.zip`))
    // `${app.path.rootFolder}` - это запись значит что имя будет как у корневой папки
    .pipe(app.gulp.dest('./'));
}
//$Функция (END)