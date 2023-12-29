import {showModal} from './modal.js';
// import {formReset} from './getData.js';
// import {fetchRequest} from './fetchRequest.js';

// const body = document.querySelector('body');
// const reservation = document.querySelector('.reservation');
// const reservationForm = reservation.querySelector('.reservation__form');
// const reservationTitle = reservation.querySelector('.reservation__title');
// const reservationDate = reservation.querySelector('#reservation__date');
// const reservationPeople = reservation.querySelector('#reservation__people');
// const reservationName = reservation.querySelector('#reservation__name');
// const reservationTel = reservation.querySelector('#reservation__phone');

// const URL = 'https://jsonplaceholder.typicode.com/posts';

// reservationForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const params = {
//     date: reservationDate.value,
//     people: reservationPeople.value,
//     name: reservationName.value,
//     tel: reservationTel.value,
//   };
//   fetchRequest(URL, {
//     method: 'POST',
//   //   title: reservationTitle.textContent,
//     body: params,
//     cb: showModal,
  //   cb(err, data) {
  //     if (err) {
  //       formReset();
  //       // eslint-disable-next-line max-len
  //       const modal = renderModal(body, {title: 'Упс... Что-то пошло не так', text: 'Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз', btn: true});
  //       setTimeout(() => {
  //         closeModal(body, modal);
  //       }, 4000);
  //     } else {
  //       formReset();
  //       // eslint-disable-next-line max-len
  //       const modal = renderModal(body, {title: 'Ваша заявка успешно отправлена', text: 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней', svg: true});
  //       setTimeout(() => {
  //         closeModal(body, modal);
  //       }, 4000);
  //     }
  //   },
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
// });
