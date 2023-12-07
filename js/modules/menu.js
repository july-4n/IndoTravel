const menu = () => {
  const menuBtn = document.querySelector('.header__menu-button');
  const headerMenu = document.querySelector('.header__menu');
  const main = document.querySelector('main');

  menuBtn.addEventListener('click', () => {
    headerMenu.classList.add('header__menu_active');
  });

  const closeMenu = () => {
    headerMenu.classList.remove('header__menu_active');
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
};

export {
  menu,
};
