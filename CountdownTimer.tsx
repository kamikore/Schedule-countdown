import * as React from 'react';

interface CountdownTimerProps {
  schedule: null | {
    id: String;
    title: String;
    dateTime: Date;
    content: String;
  };
}

function CountdownTimer(props: CountdownTimerProps) {
  const { schedule } = props;
  const [days, setDays] = React.useState(null);
  const [hours, setHours] = React.useState(null);
  const [minutes, setMinutes] = React.useState(null);
  const [seconds, setSeconds] = React.useState(null);

  function getDD(dateTime) {
    return String(dateTime.getDate()).padStart(2, '0');
  }

  function getMM(dateTime) {
    return String(dateTime.getMonth() + 1).padStart(2, '0');
  }

  (function () {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    let today = new Date(),
      dd = getDD(today),
      mm = getMM(today),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth =
        getMM(schedule.dateTime) + '/' + getDD(schedule.dateTime) + '/',
      birthday = dayMonth + yyyy;

    today = mm + '/' + dd + '/' + yyyy;
    if (today > birthday) {
      birthday = dayMonth + nextYear;
    }

    const countDown = new Date(birthday).getTime(),
      x = setInterval(function () {
        const now = new Date().getTime(),
          distance = countDown - now;

        setDays(Math.floor(distance / day));

        setHours(Math.floor((distance % day) / hour));

        setMinutes(Math.floor((distance % hour) / minute));
        setSeconds(Math.floor((distance % minute) / second));

        //do something later when date is reached
        if (distance < 0) {
          clearInterval(x);
        }
        //seconds
      }, 0);
  })();

  return schedule ? (
    <div className="container">
      <h1 id="headline">{schedule.title}</h1>
      <div id="countdown">
        <ul>
          <li>
            <span id="days">{days}</span>Days
          </li>
          <li>
            <span id="hours">{hours}</span>Hours
          </li>
          <li>
            <span id="minutes">{minutes}</span>Minutes
          </li>
          <li>
            <span id="seconds">{seconds}</span>Seconds
          </li>
        </ul>
      </div>
    </div>
  ) : null;
}

CountdownTimer.defaultProps = {
  schedule: null,
};

export default CountdownTimer;
