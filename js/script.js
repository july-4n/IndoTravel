import {timer} from './modules/timer.js';

const deadlineData =
  document.querySelector('[data-timer-deadline]').dataset.timerDeadline;
timer(deadlineData);
