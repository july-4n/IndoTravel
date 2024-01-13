import './vendor/swiper.js';

const slider = document.querySelector('.album__slider');

// eslint-disable-next-line no-undef
new Swiper(slider, {
  slidesPerView: 'auto',
  loop: true,

  navigation: {
    nextEl: '.album__right',
    prevEl: '.album__left',
  },
});
