import React from "react";
import classes from "./Counters.module.css";
import CountersContainer from "../UI/CountersContainer";

const Counters = (props) => {
  // Reciving our main data that we will render on the UI via props.
  const days = props.days;
  const hours = props.hours;
  const minutes = props.minutes;
  const seconds = props.seconds;

  return (
    <CountersContainer>
      <div className={`${classes["countdown-el"]} ${classes["days-c"]}`}>
        <p className={classes["big-text"]} id="days">
          {!days ? "0" : days}
        </p>
        <span>Days Left</span>
      </div>
      <div className={classes["countdown-el"]}>
        <p className={classes["big-text"]} id="hours">
          {!hours ? "0" : hours}
        </p>
        <span>Hours Left</span>
      </div>
      <div className={classes["countdown-el"]}>
        <p className={classes["big-text"]} id="mins">
          {!minutes ? "0" : minutes}
        </p>
        <span>Minutes Left</span>
      </div>
      <div className={`${classes["countdown-el"]} ${classes["seconds-c"]}`}>
        <p className={classes["big-text"]} id="seconds">
          {!seconds ? "0" : seconds}
        </p>
        <span>Seconds Left</span>
      </div>
    </CountersContainer>
  );
};

export default Counters;
