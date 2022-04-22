import { useState, useRef, useCallback, useEffect } from "react";

// This is a custom hook component, we created it to clean the main app component a little pit and also refactor some code.
const useAppLogic = () => {
  const [daysLeft, setDaysLeft] = useState("0");
  const [hoursLeft, setHoursLeft] = useState("0");
  const [minutesLeft, setMinutesLeft] = useState("0");
  const [secondsLeft, setSecondsLeft] = useState("0");
  const [showSpinner, setShowSpinner] = useState(false);
  const [showElement, setShowElement] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [recivedData, setRecivedData] = useState("");

  // Function call to recive the data that the user entered, and then sotre them inside of a state.
  const getBirhtdayDate = (birthdayDate) => {
    setRecivedData(birthdayDate);
  };

  // we declare the interval outside of the countdownTimer function, and that is because later we want to clear it everytime there is a new value or when the user chose to restart the app, if we declare it inside, we won't be able to stop it and will be some bugs.

  // Also we store it inside of a Ref state hook because we want to sotre the mutable value of the interval in a safe plase so that we do not lose after everytime there is a component render, and also for the reason that, we are then mutating the interval value inside a function that is used inside of a useCallback hook.
  let interval = useRef(null);

  // Our main countdown function that will be called everytime when the user enter a new data.
  const countdownTimer = useCallback(() => {
    const presentYear = new Date().getFullYear();
    const enteredMonth = recivedData.enteredMonth - 1;
    const enteredDay = recivedData.enteredDay;
    const enteredBirthDate = new Date(
      presentYear,
      enteredMonth,
      enteredDay,
      0,
      0,
      0
    );

    // The interval function that will be called every seconds in order to show the timer and make the whole app work.
    interval.current = setInterval(() => {
      const currentDate = new Date();

      const BirthDay = +enteredBirthDate - +currentDate;

      let days = Math.floor(BirthDay / (1000 * 24 * 60 * 60));

      let hours = Math.floor(
        (BirthDay % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      let minutes = Math.floor((BirthDay % (1000 * 60 * 60)) / (1000 * 60));

      let seconds = Math.floor((BirthDay % (1000 * 60)) / 1000);

      if (days < 0) days = 365 + days;
      if (hours < 0) hours = 24 + hours;
      if (minutes < 0) minutes = 60 + minutes;
      if (seconds < 0) seconds = 60 + seconds;

      // we store all the processed data inside of a different states, and then we pass them to our counters component to show them on the UI.
      setDaysLeft(days);
      setHoursLeft(hours);
      setMinutesLeft(minutes);
      setSecondsLeft(seconds);
    }, 1000);

    // The countdown function (interval) will run everytime the user inputs a new data as we see in the dependinces
  }, [recivedData.enteredDay, recivedData.enteredMonth]);

  // UseEffect Hook here will call the main countdownTimer function when the app first time evalute and execute, and also everytime the dependencie change and the dependencie here is the revived date that the user input.
  useEffect(() => {
    countdownTimer();

    return () => {
      // We pass a helper(cleaner) function to the useEffect hook and this function will clean the interval after the first execution of useEffect and then before everytime useEffect hook run and execute the countdown function.....Interesting!!

      // We clear the value inside the current position because we sotre it there.
      clearInterval(interval.current);
    };
  }, [recivedData, countdownTimer]);

  // Simple function to update some states so that we get some interesting UI changes, Keep in mind that later in the main app component we are rendering components conditionally depending on state changes.
  const hideAndShow = () => {
    setShowSpinner(true);
    setShowForm(false);
    setTimeout(() => {
      setShowElement(true);
      setShowSpinner(false);
    }, 3000);
  };

  // The same thing we do here when the user wants to restart the app we update some state and here we also clear the interval because we are restarting.
  const restartApp = () => {
    clearInterval(interval);
    setShowSpinner(true);
    setShowElement(false);
    setTimeout(() => {
      setShowForm(true);
      setShowSpinner(false);
    }, 1000);
  };

  // This is a custom hook component so we should return exactly everything that we are gonna use in other components when we use that hook.
  return {
    hideAndShow,
    restartApp,
    showForm,
    showSpinner,
    showElement,
    getBirhtdayDate,
    recivedData,
    daysLeft,
    hoursLeft,
    minutesLeft,
    secondsLeft,
    countdownTimer,
  };
};

// Export the custom hook!
export default useAppLogic;
