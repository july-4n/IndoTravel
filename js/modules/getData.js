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

const loadData = async () => {
  const result = await fetch('date.json');

  const data = await result.json();

  return data;
};

const createOption = (text) => {
  const option = document.createElement('option');
  option.textContent = text;
  return option;
};

const renderOptions = async () => {
  const data = await loadData();
  tourDate.innerHTML = '';

  const titleOptionDate = createOption("Выбери дату");

  const dates = data.map(el => {
    const option = createOption(el.date);
    option.classList.add('tour__option');
    option.value = el.date;

    return option;
  });

  tourDate.append(titleOptionDate);
  tourDate.append(...dates);
};

const renderOptionsRes = async () => {
  const data = await loadData();
  reservationDate.innerHTML = '';

  const titleOptionDateRes = createOption("Дата путешествия");

  const dates = data.map(el => {
    const option = createOption(el.date);
    option.classList.add('tour__option');
    option.value = el.date;

    return option;
  });

  reservationDate.append(titleOptionDateRes);
  reservationDate.append(...dates);
};

const renderAmoutPeople = async () => {
  const data = await loadData();
  tourPeople.innerHTML = '';

  const titleOptionPeople = createOption("Количество человек");

  const selectedDate = tourDate.value;
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

    tourPeople.append(titleOptionPeople);
    tourPeople.append(...people);
  }
};

const renderAmoutPeopleRes = async () => {
  const data = await loadData();
  reservationPeople.innerHTML = '';

  const titleOptionPeople = createOption("Количество человек");

  const selectedDate = reservationDate.value;
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

    reservationPeople.append(titleOptionPeople);
    reservationPeople.append(...people);
  }
};

const getSummary = (date, people) => {
  const formatedDate = formatDate(date);
  // eslint-disable-next-line max-len
  reservationInfo.textContent = `${formatedDate}, ${people} ${peopleCaption(parseInt(people))}`;
};

const getTotalPrice = async (date, people) => {
  const data = await loadData();
  const selectedDate = date;
  const selectedDateData = data.find(el => el.date === selectedDate);
  const price = selectedDateData.price;

  if (!Number.isNaN(people) && typeof people === 'number') {
    const total = price * people;
    reservationPrice.textContent = total;
  }
};

renderOptions();
tourDate.addEventListener('change', () => {
  renderAmoutPeople();
});

renderOptionsRes();
reservationDate.addEventListener('change', () => {
  renderAmoutPeopleRes();
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

export {
  formReset,
};
