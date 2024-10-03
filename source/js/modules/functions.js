import Swiper, { Pagination, Keyboard, EffectCards, Autoplay } from 'swiper';
Swiper.use([Pagination, Keyboard, EffectCards, Autoplay]);

export function createIntroSwiper(selector) {
  return new Swiper(selector, {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoHeight: true,
    grabCursor: true,
    slidesPerView: 1,
    speed: 700,
    autoplay: { delay: 5000 },
    // Keyboard
    keyboard: { enabled: true },
    // Pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}












