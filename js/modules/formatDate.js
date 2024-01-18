const formatDate = (dateRange) => {
  const [startDay, startMonth] = dateRange.split(' - ')[0].split('.');
  const [endDay, endMonth] = dateRange.split(' - ')[1].split('.');

  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  // eslint-disable-next-line max-len
  const formattedStartDate = `${parseInt(startDay, 10)} ${months[parseInt(startMonth, 10) - 1]}`;
  // eslint-disable-next-line max-len
  const formattedEndDate = `${parseInt(endDay, 10)} ${months[parseInt(endMonth, 10) - 1]}`;

  const convertedDateRange = `${formattedStartDate} - ${formattedEndDate}`;

  return convertedDateRange;
};

export default formatDate;
