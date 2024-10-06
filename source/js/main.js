
//*IMPORT Module ( START )
import * as ssFunction from "./modules/functions.js"
const introSwiper = ssFunction.createIntroSwiper('.intro__swiper');
ssFunction.createCardsSwiper('.play-cards-swiper');


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


//*-----------------------------------------Scroll menu nav (START)

const anchors = document.querySelectorAll('.menu__link');
if (anchors.length > 0) {
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const anchorId = anchor.dataset.gota;
      const anchorBlock = document.getElementById(`${anchorId}`);

      if (anchorBlock && anchorId) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const gotoBlockScroll = anchorBlock.getBoundingClientRect().top + window.scrollY - headerHeight;


        if (menu.classList.contains('open')) {
          toggleMenu();
        }
        window.scrollTo({ behavior: 'smooth', top: gotoBlockScroll, });
        e.preventDefault();
      }
    });
  });

}
//*------------------------------------------Scroll menu nav (END)



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


//*                                 READ MORE (START)                                        


// Находим кнопку и тело текста
const readMoreButton = document.querySelector('.play-cards__button');
const readMoreBody = document.querySelector('.play-cards__content');

//! Добавляем обработчик события при клике на кнопку
readMoreButton.addEventListener('click', function () {
  
  readMoreBody.classList.toggle('visible');


  // Изменяем текст кнопки
  if(readMoreBody.classList.contains('visible')) {
    readMoreButton.innerText = 'Read Less';
  }else {
    readMoreButton.innerText = 'Read more';
  }

});

//*                                 READ MORE (END)                                          


//*--------------------------------------Filter Factions (START)---------------------------


// Удаление активных классов у кнопок и контента
function removeActiveClasses() {
  filterButton.forEach(button => { button.classList.remove('active') });
  filterContent.forEach(content => { content.classList.remove('active') });
};

// Добавление класса active контенту
function filterContentOpen(buttonAttribut) {
  filterContent.forEach(content => {
    const contentAttribut = content.dataset.filter;
    //-----------------------------
    (contentAttribut.includes(buttonAttribut) || !buttonAttribut) ?
      content.classList.add('active') : content.classList.remove('active');
    animOnScroll();
    //-----------------------------
  });
};


const filterButton = document.querySelectorAll('.filter-views__button');
const filterContent = document.querySelectorAll('.view__item');

//!Объвляем действия по нажатию на кнопку.
for (let button of filterButton) {
  button.addEventListener('click', function (e) {
    //-----------------------------
    const buttonAttribut = button.dataset.filter;
    //-----------------------------
    removeActiveClasses();
    // Добавление класса active контенту и кнопке
    button.classList.add('active');
    filterContentOpen(buttonAttribut);
    //-----------------------------
  });
  //-----------------------------
  //Клик по 3 кнопке!
  if (button === filterButton[2]) {
    button.click();
  }
}

//*--------------------------------------Filter Factions (END)-----------------------------













