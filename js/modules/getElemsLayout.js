const getElemsLayout = () => {
  const tour = document.querySelector('.tour');
  const tourDate = tour.querySelector('#tour__date');
  const tourPeople = tour.querySelector('#tour__people');
  const reservation = document.querySelector('.reservation');
  const reservationForm = reservation.querySelector('.reservation__form');
  const reservationDate = reservation.querySelector('#reservation__date');
  const reservationPeople = reservation.querySelector('#reservation__people');
  const reservationInfo = reservation.querySelector('.reservation__data');
  const reservationPrice = reservation.querySelector('.reservation__price');
  const reservationName = reservation.querySelector('#reservation__name');
  const reservationPhone = reservation.querySelector('#reservation__phone');

  return {
    tourDate,
    tourPeople,
    reservationForm,
    reservationDate,
    reservationPeople,
    reservationInfo,
    reservationPrice,
    reservationName,
    reservationPhone,
  }
}

export default getElemsLayout;
