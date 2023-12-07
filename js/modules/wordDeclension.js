const daysCaption = value => {
  if (value === 1 || value === 21 || value === 31) {
    return 'день';
  } else if (value === 0 ||
      (value >= 5 && value <= 20) || (value >= 25 && value <= 30)) {
    return 'дней';
  } else {
    return 'дня';
  }
};

const hoursCaption = value => {
  if (value === 1 || value === 21) {
    return 'час';
  } else if ((value >= 5 && value <= 20) || value === 0) {
    return 'часов';
  } else {
    return 'часа';
  }
};

const minutesCaption = value => {
  if (value === 1 ||
      value === 21 ||
      value === 31 ||
      value === 41 ||
      value === 51) {
    return 'минута';
  } else if (value === 0 ||
      (value >= 5 && value <= 20) ||
      (value >= 25 && value <= 30) ||
      (value >= 35 && value <= 40) ||
      (value >= 45 && value <= 50) ||
      (value >= 55 && value <= 60)) {
    return 'минут';
  } else {
    return 'минуты';
  }
};

const secondsCaption = value => {
  if (value === 1 ||
      value === 21 ||
      value === 31 ||
      value === 41 ||
      value === 51) {
    return 'секунда';
  } else if (value === 0 ||
      (value >= 5 && value <= 20) ||
      (value >= 25 && value <= 30) ||
      (value >= 35 && value <= 40) ||
      (value >= 45 && value <= 50) ||
      (value >= 55 && value <= 60)) {
    return 'секунд';
  } else {
    return 'секунды';
  }
};

export {
  daysCaption,
  hoursCaption,
  minutesCaption,
  secondsCaption,
};
