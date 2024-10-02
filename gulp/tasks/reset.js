//$Подключение плагинов (START)
import { deleteAsync } from 'del'; // Обновляет папку dist
//$Подключение плагинов (END)


//$Функция (START)
export const cmdReset = () => {
  return deleteAsync(app.path.clean); // выбираем папку к удалению
}
//$Функция (END)