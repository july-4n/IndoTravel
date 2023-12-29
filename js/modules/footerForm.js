import {fetchRequest} from './modules/fetch.js';

const footerForm = document.querySelector('.footer__form');
const footerFormTitle = footerForm.querySelector('.footer__form-title');
const footerText = footerForm.querySelector('.footer__text');
const footerInputWrap = footerForm.querySelector('.footer__input-wrap');
const footerInput = footerInputWrap.querySelector('.footer__input');

const URL = 'https://jsonplaceholder.typicode.com/posts';

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
