//Получаем имя папки проекта
//! Ипортируем модуль, package.json type: module; ES6
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());
//! С помощью модуля получаем имя папки Проектом записываем его в переменную rootFolder


const buildFolder = `./dist`; //!Путь папки с результатом
const srcFolder = `./source`; //! Путь к папки с исходниками


//$ Пути к папкам и файлам (START)
//! (START)
//В объекте const path - храниться вся информация о пути к файлам или папкам
export const path = {
  build: { //ключ до файлів із результатами
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: { //ключ до файлів із джерел
    js: `${srcFolder}/js/*.js`, // js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`, //{перечисляем нужные форматы}
    svg: `${srcFolder}/img/**/*.svg`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`,
    fonts: `${srcFolder}/fonts/**/*.*`,
    svgicons: `${srcFolder}/svgicons/**/*.svg`,
    files: `${srcFolder}/files/**/*.*`,

  },
  watch: { //ключ до файлів для стеження
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`, //Следим за всеми файлами html во всех папках src
    images: `${srcFolder}/img/**/*.{jpg,jpeg,ico,svg,png,gif,webp}`,
    files: `${srcFolder}/files/**/*.*`,
  },

  //вспомогательные ключи
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``,
  //вспомогательные ключи
}
//! (END)
//$ Пути к папкам и файлам (END)