import {daysCaption, hoursCaption, minutesCaption} from './wordDeclension.js';

const heroContent = document.querySelector('.hero__content');
const heroText = heroContent.querySelector('.hero__text');
const heroTimer = heroContent.querySelector('[data-timer-deadline]');

const timer = deadline => {
  const timerDays = heroTimer.querySelector('.timer__count_days');
  const timerHours = heroTimer.querySelector('.timer__count_hours');
  const timerMinutes = heroTimer.querySelector('.timer__count_minutes');

  const captionDays = heroTimer.querySelector('.timer__units_days');
  const captionHours = heroTimer.querySelector('.timer__units_hours');
  const captionMinutes = heroTimer.querySelector('.timer__units_minutes');

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor((timeRemaining / 1000 / 60 / 60) % 24);

    return {timeRemaining, days, minutes, hours};
  };

  const formatTime = value => (value < 10 ? '0' + value : value);

  const start = () => {
    const timer = getTimeRemaining();

    captionDays.innerText = daysCaption(timer.days);
    captionHours.innerText = hoursCaption(timer.hours);
    captionMinutes.innerText = minutesCaption(timer.minutes);

    timerDays.textContent = timer.days;
    timerHours.textContent = formatTime(timer.hours);
    timerMinutes.textContent = formatTime(timer.minutes);

    const intervalId = setTimeout(start, 60000);

    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);
      heroContent.removeChild(heroText);
      heroContent.removeChild(heroTimer);
    }
  };

  start();
};

export {
  timer,
};
