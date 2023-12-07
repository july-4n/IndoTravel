const accordion = () => {
  const travel = document.querySelector('.travel');
  const items = travel.querySelectorAll('.travel__item');
  const itemsBtns = travel.querySelectorAll('.travel__item-title');
  const textWrapper = travel.querySelectorAll('.travel__item-text-wrapper');

  let hightWrapper = 0;
  textWrapper.forEach(el => {
    if (hightWrapper < el.scrollHeight) {
      hightWrapper = el.scrollHeight;
    }
  });

  itemsBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      for (let i = 0; i < items.length; i++) {
        if (index === i) {
          textWrapper[i].style.height =
          items[i].classList.contains('travel__item_active') ?
          '' : `${hightWrapper}px`;
          items[i].classList.toggle('travel__item_active');
        } else {
          items[i].classList.remove('travel__item_active');
          textWrapper[i].style.height = '';
        }
      }
    });
  });
};

export {
  accordion,
};
