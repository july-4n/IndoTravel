import getElemsLayout from './getElemsLayout.js';
import formatDate from './formatDate.js';
import pluralize from './pluralize.js';

const {
  reservationDate,
  reservationPeople,
  reservationPrice,
} = getElemsLayout();

const createModal = () => {
  const overlay = document.createElement('div');
  const modal = document.createElement('div');
  const title = document.createElement('h2');
  const travelText = document.createElement('p');
  const travelDates = document.createElement('p');
  const price = document.createElement('p');
  const btnWrapper = document.createElement('div');
  const btnConfirm = document.createElement('button');
  const btnEdit = document.createElement('button');

  overlay.classList.add('overlay', 'overlay_confirm');
  modal.classList.add('modal');

  title.classList.add('modal__title');
  title.textContent = 'Подтверждение заявки';

  travelText.classList.add('modal__text');
  travelText.textContent =
    `Бронирование путешествия в Индию на ${reservationPeople.value} ${pluralize(reservationPeople.value, ['человек', 'человека', 'человек'])}`;

  travelDates.classList.add('modal__text');
  const chosenDate = formatDate(reservationDate.value);

  travelDates.textContent = `В даты: ${chosenDate}`;

  price.classList.add('modal__text');
  price.textContent = `Стоимость тура ${reservationPrice.textContent}`;


  btnWrapper.classList.add('modal__button', 'modal__btn_confirm');
  btnConfirm.classList.add('modal__btn', 'modal__btn_edit');
  btnConfirm.textContent = 'Подтверждаю';
  btnConfirm.type = 'button';
  btnEdit.classList.add('modal__btn');
  btnEdit.textContent = 'Изменить данные';
  btnEdit.type = 'button';

  overlay.append(modal);
  btnWrapper.append(btnConfirm, btnEdit);
  modal.append(title, travelText, travelDates, price, btnWrapper);
  document.body.append(overlay);

  return {
    btnConfirm,
    btnEdit,
    overlay,
  }
};

export default createModal;
