import {fetchRequest} from './fetchRequest.js';
import showModal from './modal.js';
import {peopleCaption} from './wordDeclension.js';
import {formatDate} from './formatDate.js';

const tour = document.querySelector('.tour');
const tourDate = tour.querySelector('#tour__date');
const tourPeople = tour.querySelector('#tour__people');
const reservation = document.querySelector('.reservation');
const reservationForm = reservation.querySelector('.reservation__form');
const reservationDate = reservation.querySelector('#reservation__date');
const reservationPeople = reservation.querySelector('#reservation__people');
const reservationInfo = reservation.querySelector('.reservation__data');
const reservationPrice = reservation.querySelector('.reservation__price');

reservationInfo.textContent = '';
reservationPrice.textContent = '';

const formReset = () => {
  reservationForm.reset();
  reservationInfo.textContent = '';
  reservationPrice.textContent = '';
};

const createOption = (text) => {
  const option = document.createElement('option');
  option.textContent = text;
  return option;
};

const renderOptions = async (target, titleText, data) => {
  target.innerHTML = '';

  const titleOption = createOption(titleText);

  const dates = data.map(el => {
    const option = createOption(el.date);
    option.classList.add('tour__option');
    option.value = el.date;

    return option;
  });

  target.append(titleOption);
  target.append(...dates);
};

const renderAmoutPeople = async (target, titleText, selectedDate, data) => {
  target.innerHTML = '';

  const titleOptionPeople = createOption(titleText);
  const selectedDateData = data.find(el => el.date === selectedDate);

  if (selectedDateData) {
    const {'min-people': minPeople,
      'max-people': maxPeople} = selectedDateData;

    const people = [];
    for (let i = minPeople; i <= maxPeople; i++) {
      const option = createOption(i);
      option.classList.add('tour__option');
      people.push(option);
    }

    target.append(titleOptionPeople);
    target.append(...people);
  }
};

const getSummary = (date, people) => {
  const formatedDate = formatDate(date);
  // eslint-disable-next-line max-len
  reservationInfo.textContent = `${formatedDate}, ${people} ${peopleCaption(parseInt(people))}`;
  return `${formatedDate}, ${people} ${peopleCaption(parseInt(people))}`;
};

fetchRequest('date.json', {
  method: 'GET',
  headers: {'Content-Type': 'application/json'},
  cb: (error, data) => {
    if (error) {
      console.error('Произошла ошибка:', error);
    } else {
      console.log('Полученные данные:', data);

      const getTotalPrice = async (date, people) => {
        const selectedDate = date;
        const selectedDateData = data.find(el => el.date === selectedDate);
        const price = selectedDateData.price;

        if (!Number.isNaN(people) && typeof people === 'number') {
          const total = price * people;
          // eslint-disable-next-line max-len
          const formattedNumber = total.toLocaleString('en-RU').replace(/,/g, ' ');
          reservationPrice.textContent = formattedNumber + ' ₽';
        }
      };

      renderOptions(tourDate, "Выбери дату", data);

      tourDate.addEventListener('change', () => {
        // eslint-disable-next-line max-len
        renderAmoutPeople(tourPeople, "Количество человек", tourDate.value, data);
      });

      renderOptions(reservationDate, "Дата путешествия", data);

      reservationDate.addEventListener('change', () => {
        // eslint-disable-next-line max-len
        renderAmoutPeople(reservationPeople, "Количество человек", reservationDate.value, data);
      });

      const handleChangeText = () => {
        reservationInfo.textContent = '';
        reservationPrice.textContent = '';
      };

      const handleChange = () => {
        const chosenDate = reservationDate.value;
        const chosenPeople = +reservationPeople.value;

        if (chosenDate && chosenPeople) {
          getSummary(chosenDate, chosenPeople);
          getTotalPrice(chosenDate, chosenPeople);
        }
      };

      reservationPeople.addEventListener('change', handleChange);

      reservationDate.addEventListener('change', handleChangeText);
    }
  },
});

reservationForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  fetchRequest('date.json', {
    method: 'GET',
    cb: showModal,
  });
});

export {
  formReset,
};
