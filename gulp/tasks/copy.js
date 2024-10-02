//srcFolder = `./src`
//buildFolder = `./dist`


//$ Функция пример. (START)
//Копирование содержимого папки files.
export const copy = () => {
  return app.gulp.src(app.path.src.files) //`${srcFolder}/files/**/*.*`
    .pipe(app.gulp.dest(app.path.build.files)) //`${buildFolder}/files/`
}
//$ Функция пример. (END)