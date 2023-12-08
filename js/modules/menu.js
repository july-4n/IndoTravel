import {animateMenu} from './animateMenu.js';

const menu = () => {
  const menuBtn = document.querySelector('.header__menu-button');
  const headerMenu = document.querySelector('.header__menu');
  const main = document.querySelector('main');
  const header = document.querySelector('header');
  const headerContainer = document.querySelector('.header__container');

  const top = -(headerMenu.offsetHeight + headerContainer.offsetTop);
  headerMenu.style.top = top + 'px';

  menuBtn.addEventListener('click', () => {
    animateMenu();
  });

  const closeMenu = () => {
    headerMenu.style.top = top + 'px';
  };

  headerMenu.addEventListener('click', ({target}) => {
    if (target.classList.contains('header__link')) {
      closeMenu();
    }
  });

  main.addEventListener('click', ({target}) => {
    if (target !== menuBtn) {
      closeMenu();
    }
  });

  header.addEventListener('click', ({target}) => {
    if (target !== menuBtn) {
      closeMenu();
    }
  });
};

menu();
