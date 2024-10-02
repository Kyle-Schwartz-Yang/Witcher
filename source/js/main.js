

//*Burger menu (START)

//Создаем функцию Добавить/Удалить Класс
function toggleMenu() {
  burger.classList.toggle('open');
  menu.classList.toggle('open');
  document.body.classList.toggle('hidden');
}

//!события по нажатию на burger
const headerElement = {
  menu: document.querySelector('.menu'),
  burger: document.querySelector('.burger'),
};
//Деструктуризация объекта
const { menu, burger, } = headerElement;

if (burger) {
  //Добавляем событие по burger.
  burger.addEventListener('click', function (e) {
    e.preventDefault();
    toggleMenu();

  });
}

//*Burger menu (END)


















