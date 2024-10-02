//$На данные момент не актуально 
// import { configFTP } from '../config/ftp.js';
// import vinylFTP from 'vinyl-ftp';
// import util from 'gulp-util';


// export const ftp = () => {
//   configFTP.log = util.log;
//   const ftpConnect = vinylFTP.create(configFTP);
//   return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
//     .pipe(app.plugins.plumber( //Настрока сообщения об ошибке
//       app.plugins.notify.onError({
//         title: "ftp",
//         message: "Обнаружен ERROR--->: <%= error.message %>"
//       }))
//     )
//     .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
// }

