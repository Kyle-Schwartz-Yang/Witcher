
//*IMPORT Module ( START )
import * as ssFunction from "./modules/functions.js"
const introSwiper = ssFunction.createIntroSwiper('.intro__swiper');


//*IMPORT Module ( END )



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



//* --------------------------------------------------------ANIMATION ( START )
const animItems = document.querySelectorAll('.animation-items');

function animOnScroll() {
  for (let index = 0; index < animItems.length; index++) {
    const animItem = animItems[index];
    const animItemHeight = animItem.offsetHeight;
    const animItemOffset = offset(animItem).top;
    const animStart = 4;

    const animItemPoint = window.innerHeight - (Math.min(animItemHeight, window.innerHeight) / animStart);
    if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
      animItem.classList.add('animation');
    } else {

      if (!animItem.classList.contains('stop-animation-repeat')) {
        animItem.classList.remove('animation');
      }

    }
  }
}

function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

if (animItems.length > 0) {

  // Дебаунс функция
  function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
      const later = () => {
        timeout = null;
        func();
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Слушаем событие скролла с помощью дебаунс функции
  const debouncedAnimOnScroll = debounce(animOnScroll, 100);
  window.addEventListener('scroll', debouncedAnimOnScroll);

  setTimeout(() => {
    animOnScroll();
  }, 100);
}
//* --------------------------------------------------------ANIMATION ( END )


















