
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


//*                                    MODAL__(START)

//$Global setting
//Функция открывающая модальный окна (глобальная)
function openModal(modalItem) {
  if (!modalItem.classList.contains('modal--open') && modalItem) {
    //-----------------------------
    modalItem.classList.add('modal--open');
    document.body.classList.add('lock');
    //-----------------------------
  }
}

//Функция закрывающая модальный окна (глобальная)
function closeModal(modalItem) {
  if (modalItem.classList.contains('modal--open')) {
    //-----------------------------
    modalItem.classList.remove('modal--open');
    document.body.classList.remove('lock');
    introSwiper.keyboard.enable();
    //-----------------------------
  }
}

//!Закрытие по нажатие на Escape + keyboard.disable()
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keydown', function (event) {
    const pressedKey = event.key;
    const openModals = document.querySelectorAll('.modal--open');
    //-----------------------------
    if (openModals.length > 0) {
      if (pressedKey === 'ArrowRight' || pressedKey === 'ArrowLeft') {
        introSwiper.keyboard.disable();
      } else {
        introSwiper.keyboard.enable();
      }
    }
    //-----------------------------
    if (pressedKey === 'Escape') {
      openModals.forEach(openModal => {
        closeModal(openModal);
        stopVideo(openModal);
      });
    }
    //-----------------------------
  });
});

//$Global setting

//$media modal            (START)

const modalMediaOpenButtons = document.querySelectorAll('.intro__media-button');
const modalMediaCloseButtons = document.querySelectorAll('.media-modal__close');
const modalMedia = document.querySelectorAll('.media-modal');

//!Открываем модальное окно по нажатию на modalMediaOpenButtons
for (const openButton of modalMediaOpenButtons) {
  openButton.addEventListener('click', () => {
    //-----------------------------
    const mediaItem = document.getElementById(openButton.dataset.goto);
    const video = openButton.dataset.video;

    //-----------------------------
    openModal(mediaItem);
    playVideo(mediaItem, video);
    //-----------------------------
    if (mediaItem) {
      clickNotOnVideo(mediaItem);
      closeAllMediaButtons(mediaItem);
    }
    //-----------------------------
  });
}

//Закрываем видео если был совершен клик вне элемента iframe
function clickNotOnVideo(mediaItem) {
  mediaItem.addEventListener('click', event => {
    const target = event.target;
    const iframe = mediaItem.querySelector('iframe');
    if (iframe && !iframe.contains(target)) {
      closeModal(mediaItem);
      stopVideo(mediaItem);
    }
  });
}

//Закрытие модального окно по нажатию на modalMediaCloseButtons (Х) 
function closeAllMediaButtons(mediaItem) {
  modalMediaCloseButtons.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
      //-----------------------------
      closeModal(mediaItem);
      stopVideo(mediaItem);
      //-----------------------------
    });
  });
}

//Функция автоматически запускает видео (учитывая его ID)
function playVideo(videoItem, video) {
  if (videoItem && video) {
    //-----------------------------
    const iframe = videoItem.querySelector('iframe');
    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/${video}?autoplay=1`;
    }
    //-----------------------------
  }
}

//Функция закрывает видео (убирая ему src='')
function stopVideo(videoItem) {
  //-----------------------------
  const iframe = videoItem.querySelector('iframe');
  if (iframe) {
    iframe.src = ``;
  }
  //-----------------------------
}




//$media modal           (END)


//$content modal           (START)

function closeAllContentButtons(contentItem) {
  modalContentCloseButtons.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
      //-----------------------------
      closeModal(contentItem);

      //-----------------------------
    });
  });
}

const modalContentOpenButtons = document.querySelectorAll('.intro__btn');
const modalContentCloseButtons = document.querySelectorAll('.content-modal__close');
const modalContent = document.querySelectorAll('.content-modal');

//!Открываем модальное окно по нажатию на modalContentOpenButtons
for (const openButton of modalContentOpenButtons) {
  openButton.addEventListener('click', () => {
    //-----------------------------
    const contentItem = document.getElementById(openButton.dataset.goto);

    openModal(contentItem);
    //-----------------------------
    closeAllContentButtons(contentItem);

  });
}

//$content modal           (END)

//*                                    MODAL__(END)

















