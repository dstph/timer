import React, { useState, useEffect } from 'react';
import { Button, TimerScoreboard } from '../../atoms'
import './timer.css';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    if(isActive){
      setSeconds(0);
      setMinutes(0);
      setHours(0);
    }
    setIsActive(!isActive);
  }
  
  const doubleClickTimeout = 300;
  let timer = undefined;
  let clickStart = () => {
    timer = setTimeout(clear, doubleClickTimeout)
  }
  let clear = () => {
    if (timer) clearTimeout(timer)
    timer = undefined
  }

  function wait() {
    if (timer) {
      setIsActive(false);
      clear();
    } else {
      clickStart();
    }
  }

  function reset() {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

  useEffect(() => {
    let interval = null;
    if (isActive){
      interval =  setInterval(()=>{
        setSeconds(seconds=>seconds+1); 
      },1000)
    }
    return () => {
      clearInterval(interval);
    }
  }, [isActive]);
  useEffect(() => {
    if (seconds/60 === 1){
        setMinutes(minutes=>minutes+1);
        setSeconds(0)
    }
  }, [seconds]);
  useEffect(() => {
    if (minutes/60 === 1){
        setHours(hours=>hours+1);
        setMinutes(0)
    }
  }, [minutes]);


  
  return(
    <>
      <div className="scoreboard">
        <TimerScoreboard time={hours} />
        <TimerScoreboard time=':' />
        <TimerScoreboard time={minutes} />
        <TimerScoreboard time=':' />
        <TimerScoreboard time={seconds} />
      </div>
      <div className='btn_container'>
        <Button children='Start/Stop' classNames='btn_primary' onClickHandler={toggle} />
        <Button children='Wait' classNames='btn_primary' onClickHandler={wait} />
        <Button children='Reset' classNames='btn_primary' onClickHandler={reset} />
      </div>
    </>
  )
}

export default Timer;