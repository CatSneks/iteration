import React from 'react';
const TodaysDate = () => {
  const today = new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const day = today.getDate();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = months[today.getMonth()];

  return <div className='date-header'>{`${dayOfWeek}, ${month} ${day}`}</div>;
};

export default TodaysDate;
