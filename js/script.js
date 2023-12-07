import {timer} from './modules/timer.js';
import {accordion} from './modules/accordion.js';
import {menu} from './modules/menu.js';

const deadlineData =
  document.querySelector('[data-timer-deadline]').dataset.timerDeadline;
timer(deadlineData);
accordion();
menu();
