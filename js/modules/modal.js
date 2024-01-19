import getElemsLayout from './getElemsLayout.js';
import loadStyle from './loadStyle.js';
import createModal from './createModal.js';
import fetchRequest from './fetchRequest.js';
import {renderModalAdd, closeModal} from './modalAdd.js';

const URL = 'https://jsonplaceholder.typicode.com/posts';

const body = document.querySelector('body');
const {
  reservationDate,
  reservationPeople,
  reservationName,
  reservationPhone,
  reservationBtn,
} = getElemsLayout();

const resetReservationData = () => {
  reservationDate.disabled = true;
  reservationPeople.disabled = true;
  reservationName.disabled = true;
  reservationPhone.disabled = true;
  reservationBtn.disabled = true;
  reservationName.parentElement.style.pointerEvents = 'none';
  reservationPhone.parentElement.style.pointerEvents = 'none';
};

const preparePhoneNumberToServer = (phone) => phone.replace(/[^\d]/g, '');

const showModal = async () => {
  await loadStyle('css/modal.css');
  const {modalForm, btnEdit, overlay} = createModal();

  return new Promise(resolve => {
    modalForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const params = {
        date: reservationDate.value,
        people: reservationPeople.value,
        name: reservationName.value,
        tel: preparePhoneNumberToServer(reservationPhone.value),
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
              resetReservationData();
            }, 4000);
          }
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
    btnEdit.addEventListener('click', () => {
      overlay.remove();
    });
  });
};

export default showModal;
