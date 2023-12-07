import {daysCaption,
  hoursCaption,
  minutesCaption,
  secondsCaption} from './wordDeclension.js';

const heroContent = document.querySelector('.hero__content');
const heroText = heroContent.querySelector('.hero__text');
const heroTimer = heroContent.querySelector('[data-timer-deadline]');
const dayBlock = heroTimer.querySelector('.timer__item_days');
heroTimer.style.backgroundColor = '#8a0005';

const timer = deadline => {
  const timerDays = heroTimer.querySelector('.timer__count_days');
  const timerHours = heroTimer.querySelector('.timer__count_hours');
  const timerMinutes = heroTimer.querySelector('.timer__count_minutes');

  const captionDays = heroTimer.querySelector('.timer__units_days');
  const captionHours = heroTimer.querySelector('.timer__units_hours');
  const captionMinutes = heroTimer.querySelector('.timer__units_minutes');

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline + ' GMT+0300').getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor((timeRemaining / 1000 / 60 / 60) % 24);
    const seconds = Math.floor(timeRemaining / 1000 % 60);

    return {timeRemaining, days, minutes, hours, seconds};
  };

  const formatTime = value => (value < 10 ? '0' + value : value);

  const secondsBlock = `
  <p class="timer__item timer__item_seconds">
  <span class="timer__count timer__count_seconds"></span>
  <span class="timer__units timer__units_seconds"></span></p>
`;

  const start = () => {
    const timer = getTimeRemaining();

    captionDays.innerText = daysCaption(timer.days);
    captionHours.innerText = hoursCaption(timer.hours);
    captionMinutes.innerText = minutesCaption(timer.minutes);

    timerDays.textContent = timer.days;
    timerHours.textContent = formatTime(timer.hours);
    timerMinutes.textContent = formatTime(timer.minutes);

    console.log(timer.timeRemaining);
    const intervalId = setTimeout(start, 1000);

    if (timer.days <= 0) {
      heroTimer.style.backgroundColor = '#566a34';
      // dayBlock.parentNode.removeChild(dayBlock);
      heroTimer.insertAdjacentHTML('beforeend', secondsBlock);

      const captionSeconds = heroTimer.querySelector('.timer__units_seconds');
      const timerSeconds = heroTimer.querySelector('.timer__count_seconds');
      captionSeconds.innerText = secondsCaption(timer.seconds);
      timerSeconds.textContent = formatTime(timer.seconds);
    }

    if (timer.timeRemaining <= 58000) {
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
