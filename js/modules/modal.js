import {loadStyle} from './loadStyle.js';
// import {getTotalPrice} from './getData.js';

const reservation = document.querySelector('.reservation');
const reservationDate = reservation.querySelector('#reservation__date');
const reservationPeople = reservation.querySelector('#reservation__people');

const showModal = async (err) => {
  console.log('modal');
  await loadStyle('css/modal.css');
  console.log('modal2');
  const overlay = document.createElement('div');
  const modal = document.createElement('div');
  const title = document.createElement('h2');
  const travelDates = document.createElement('p');
  const price = document.createElement('p');
  const btnWrapper = document.createElement('div');
  const btnConfirm = document.createElement('button');
  const btnEdit = document.createElement('button');

  overlay.classList.add('overlay', 'overlay_confirm');
  modal.classList.add('modal');

  title.classList.add('modal__title');
  title.textContent = 'Подтверждение заявки';

  travelDates.classList.add('modal__text');
  const chosenDate = reservationDate.value;

  travelDates.textContent = `В даты: ${chosenDate}`;

  price.classList.add('modal__text');
  const chosenPeople = +reservationPeople.value;
  // eslint-disable-next-line max-len
  // price.textContent = `Стоимость тура ${getTotalPrice(chosenDate, chosenPeople)}P`;

  btnWrapper.classList.add('modal__button', 'modal__btn_confirm');
  btnConfirm.classList.add('modal__btn', 'modal__btn_edit');
  btnConfirm.textContent = 'Подтверждаю';
  btnEdit.classList.add('modal__btn');
  btnEdit.textContent = 'Изменить данные';

  overlay.append(modal);
  btnWrapper.append(btnConfirm, btnEdit);
  modal.append(title, travelDates, price, btnWrapper);
  document.body.append(overlay);

  return new Promise(resolve => {
    btnConfirm.addEventListener('click', () => {
      overlay.remove();
      resolve(false);
    });
    btnEdit.addEventListener('click', () => {
      overlay.remove();
      resolve(true);
    });
  });
};

export {
  showModal,
};
