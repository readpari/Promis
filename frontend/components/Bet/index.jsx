import { async } from 'regenerator-runtime';
import { clear } from 'console';
import 'regenerator-runtime/runtime';

import style from './module.style.css';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../context';
const ButtonPlusMinus = ({ setCount, count, plusX, sign }) => {
  const [on, setOn] = useState(false);

  const countClickDown = (setfunc, count, xplusX) => {
    if (count + plusX >= 0) setfunc(count + plusX);
    setOn(true);
  };

  const countClickUp = () => {
    setOn(false);
  };

  return (
    <div
      className="button"
      onPointerDown={() => countClickDown(setCount, count, 1)}
      onPointerUp={() => countClickUp()}
      style={{ transform: on ? 'scale(1.1)' : 'scale(1)' }}>
      {sign}
    </div>
  );
};

const Question = ({ header, count, setCount, word, plusX, warn }) => {
  return (
    <div className="containerQuestion">
      <h1 className="counterHeader">{header}</h1>
      <div className="counter">
        <ButtonPlusMinus setCount={setCount} count={count} plusX={-1 * plusX} sign={'-'} />
        <div className="count">
          {count} {word}
        </div>
        <ButtonPlusMinus setCount={setCount} count={count} plusX={1 * plusX} sign={'+'} />
      </div>
      {warn && <p className="warn">increase the number </p>}
    </div>
  );
};

// Опции для ставки

const BetWasNot = ({ days, setDays, hours, setHours, bet, setBet, setBetDidMount, guestBook }) => {
  const [betButtonOn, setBetButtonOn] = useState(false);
  const [warn, setWarn] = useState({ days: false, hours: false, bet: false });

  const betButtonDown = () => {
    setBetButtonOn(true);
  };
  const betButtonUp = async () => {
    setBetButtonOn(false);
    setWarn({
      hours: hours == 0 ? true : false,
      days: days == 0 ? true : false,
      bet: bet == 0 ? true : false,
    });

    //11111111111111111111111111111111111

    if (hours && days && bet) {
      const lastTime = '0';
      const user = 'user';
      setBetDidMount(true);
      await guestBook.addMessage(user, bet, (hours = hours * 60), days, lastTime);
    }
  };

  return (
    <>
      <Question
        header={'How long are you going to read?'}
        count={hours}
        word={'hours'}
        setCount={setHours}
        plusX={1}
        warn={warn.hours}
      />
      <Question
        header={'How many days will you need?'}
        count={days}
        word={'days'}
        setCount={setDays}
        plusX={1}
        warn={warn.days}
      />
      <Question
        header={'How much are you willing to bet?'}
        count={bet}
        word={'near'}
        setCount={setBet}
        plusX={1}
        warn={warn.bet}
      />

      <div
        className="betButton"
        onPointerDown={() => betButtonDown()}
        onPointerUp={() => betButtonUp()}
        style={{ transform: betButtonOn ? 'scale(1.1)' : 'scale(1)' }}>
        bet
      </div>
    </>
  );
};

const BetWas = ({ hours, deadline, bet, guestBook, timer }) => {
  const month = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'aug', 'spt', 'nvm', 'dcm'];
  const date = new Date(deadline);
  console.log(deadline);
  const dateString = ` ${date.getDate()} ${month[date.getMonth()]} ${
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  }`;
  const timerMinute = Math.round(Number(timer) / 60_000_000_000);
  console.log('timer', Math.round(Number(timer) / 60_000_000_000));

  return (
    <>
      <h1 className="betWasH">You need to read {hours} minutes</h1>
      <h1 className="betWasH">Deadline {dateString}</h1>
      <h1 className="betWasH">bet: {bet.slice(0, -24)} near</h1>
      <h1 className="betWasH">timer : {timerMinute} minutes</h1>
    </>
  );
};

const Bet = ({ isSignedIn, guestBook, wallet }) => {
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [bet, setBet] = useState(0);
  const [betDidMount, setBetDidMount] = useState(false);
  //проверяем наличие ставки
  const [user, setUser, userName] = useContext(Context);

  //----------
  const clearState = async () => {
    await guestBook.clearState();
    setUser('');
  };

  // const [user, setUser] = useState();
  const [oldBets, setOldBets] = useState('');

  useEffect(() => {
    if (user == '' && userName !== '') {
      guestBook.getUser(userName).then(setUser);
    }

    return () => {
      setUser('');
    };
  }, [userName]);

  return (
    <div className="betContainer">
      {isSignedIn ? (
        <>
          {/* <button onClick={() => (clearState(), setUser())}>clear</button> */}
          {user ? (
            <BetWas
              guestBook={guestBook}
              hours={user.hours}
              deadline={user.deadline}
              bet={user.bet}
              timer={user.timer}
            />
          ) : userName ? (
            <BetWasNot
              guestBook={guestBook}
              hours={hours}
              setHours={setHours}
              days={days}
              setDays={setDays}
              bet={bet}
              setBet={setBet}
              setBetDidMount={setBetDidMount}
            />
          ) : (
            <h1>wait</h1>
          )}
        </>
      ) : (
        <>
          <h1 className="signInHeader">sign in</h1>
        </>
      )}
    </div>
  );
};

export default Bet;
