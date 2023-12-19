import {renderModal, closeModal} from './modal.js';
import {formReset} from './getData.js';

const body = document.querySelector('body');
const reservation = document.querySelector('.reservation');
const footer = document.querySelector('.footer');
const reservationForm = reservation.querySelector('.reservation__form');
const reservationTitle = reservation.querySelector('.reservation__title');
const reservationDate = reservation.querySelector('#reservation__date');
const reservationPeople = reservation.querySelector('#reservation__people');
const reservationName = reservation.querySelector('#reservation__name');
const reservationTel = reservation.querySelector('#reservation__phone');
const footerForm = footer.querySelector('.footer__form');
const footerFormTitle = footerForm.querySelector('.footer__form-title');
const footerText = footerForm.querySelector('.footer__text');
const footerInputWrap = footerForm.querySelector('.footer__input-wrap');
const footerInput = footerInputWrap.querySelector('.footer__input');

const successMessageHandler = () => {
  footerInput.value = '';
  footerFormTitle.textContent = 'Ваша заявка успешно отправлена';
  // eslint-disable-next-line max-len
  footerText.textContent = 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней';
  footerInputWrap.style.display = 'none';
};

const resetMessageHandler = () => {
  footerFormTitle.textContent = 'Есть вопросы по туру?';
  // eslint-disable-next-line max-len
  footerText.textContent = 'Введите свой Email и мы свяжемся с вами в течении 3 рабочих дней';
  footerInputWrap.style.display = 'flex';
};

const errorSendHandler = () => {
  footerInput.value = '';
  footerFormTitle.textContent = 'Ошибка!';
  footerText.textContent = 'Что-то пошло не так! Попробуйти позже';
  footerInputWrap.style.display = 'none';
};

const URL = 'https://jsonplaceholder.typicode.com/posts';

const fetchRequest = async (url, {
  method = 'GET',
  body,
  cb,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();

      if (cb) cb(null, data);
      return;
    }
    throw new Error(response.statusText);
  } catch (err) {
    cb(err);
  }
};

reservationForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const params = {
    date: reservationDate.value,
    people: reservationPeople.value,
    name: reservationName.value,
    tel: reservationTel.value,
  };
  fetchRequest(URL, {
    method: 'POST',
    title: reservationTitle.textContent,
    body: params,
    cb(err, data) {
      if (err) {
        formReset();
        // eslint-disable-next-line max-len
        const modal = renderModal(body, {title: 'Упс... Что-то пошло не так', text: 'Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз', btn: true});
        setTimeout(() => {
          closeModal(body, modal);
        }, 4000);
      } else {
        formReset();
        // eslint-disable-next-line max-len
        const modal = renderModal(body, {title: 'Ваша заявка успешно отправлена', text: 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней', svg: true});
        setTimeout(() => {
          closeModal(body, modal);
        }, 4000);
      }
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

footerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const params = {
    email: footerInput.value,
  };
  fetchRequest(URL, {
    method: 'POST',
    title: footerFormTitle.textContent,
    body: params,
    cb(err, data) {
      if (err) {
        errorSendHandler();
        setTimeout(() => {
          resetMessageHandler();
        }, 4000);
      } else {
        successMessageHandler();
        setTimeout(() => {
          resetMessageHandler();
        }, 4000);
      }
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
