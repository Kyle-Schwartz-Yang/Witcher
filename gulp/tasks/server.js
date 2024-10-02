//$Подключение плагинов (START)
//*Используются модули из plugins
//$Подключение плагинов (END)

//$ Функция Start Live Browser (START)
export const startLive = (done) => {
  //*Плагин browser-sync (START)
  app.plugins.browserSync.init({
    server: {
      baseDir: `${app.path.build.html}`, // Указывается путь к файлу за которым следим
      watch: true // Значение по умолчанию
    },
    notify: false, // Отключаем сообщение в браузере.
    port: 3000, // Настройка порта
    open: false,
  })
  //*Плагин browser-sync (END)
}
//$ Функция Start Live Browser (END)