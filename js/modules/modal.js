import loadStyle from './loadStyle.js';
import {formatDate} from './formatDate.js';
import {fetchRequest} from './fetchRequest.js';
import {renderModalAdd, closeModal} from './modalAdd.js';

const URL = 'https://jsonplaceholder.typicode.com/posts';

const body = document.querySelector('body');
const reservation = document.querySelector('.reservation');
const reservationDate = reservation.querySelector('#reservation__date');
const reservationPeople = reservation.querySelector('#reservation__people');
const reservationName = reservation.querySelector('#reservation__name');
const reservationTel = reservation.querySelector('#reservation__phone');
const reservationPrice = reservation.querySelector('.reservation__price');

const showModal = async () => {
  await loadStyle('css/modal.css');
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
    `Бронирование путешествия в Индию на ${reservationPeople.value} человек`;

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

  return new Promise(resolve => {
    btnConfirm.addEventListener('click', () => {
      const params = {
        date: reservationDate.value,
        people: reservationPeople.value,
        name: reservationName.value,
        tel: reservationTel.value,
      };

      fetchRequest(URL, {
        method: 'POST',
        body: params,
        cb(err, data) {
          if (err) {
            // eslint-disable-next-line max-len
            const modalAdd = renderModalAdd(body, {title: 'Упс... Что-то пошло не так', text: 'Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз', btn: true});
            setTimeout(() => {
              closeModal(body, modalAdd);
            }, 4000);
          } else {
            overlay.remove();
            // eslint-disable-next-line max-len
            const modalAdd = renderModalAdd(body, {title: 'Ваша заявка успешно отправлена', text: 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней', svg: true});
            setTimeout(() => {
              closeModal(body, modalAdd);
              reservationDate.disabled = true;
              reservationPeople.disabled = true;
              reservationName.disabled = true;
              reservationTel.disabled = true;
              reservationName.parentElement.style.pointerEvents = 'none';
              reservationTel.parentElement.style.pointerEvents = 'none';
            }, 4000);
          }
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      resolve(true);
    });
    btnEdit.addEventListener('click', () => {
      overlay.remove();
      resolve(false);
    });
  });
};

export default showModal;
