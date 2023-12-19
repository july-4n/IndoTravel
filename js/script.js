import {timer} from './modules/timer.js';
import {accordion} from './modules/accordion.js';
import './modules/menu.js';
import './modules/airoplane.js';
import './modules/getData.js';
import './modules/sendData.js';

const deadlineData =
  document.querySelector('[data-timer-deadline]').dataset.timerDeadline;
timer(deadlineData);
accordion();
