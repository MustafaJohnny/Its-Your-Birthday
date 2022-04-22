import React, { useReducer } from "react";
import classes from "./GetBirthday.module.css";

const GetBirthday = (props) => {
  // Our initial state value that we pass to our useReducer() Hook.
  const initialState = {
    enteredDay: "",
    enteredMonth: "",
  };

  // Our main reducer function that is responsible of updating the state depending on the action that we dispatch later.
  const reducer = (state, action) => {
    if (action.type === "day") {
      return { ...state, enteredDay: +action.value };
    }

    if (action.type === "month") {
      return { ...state, enteredMonth: +action.value };
    }

    if (action.type === "clean") {
      return { ...state, enteredMonth: "", enteredDay: "" };
    }

    return state;
  };

  // The main call of useReducer() Hook.
  const [userData, dispatch] = useReducer(reducer, initialState);

  let formIsValid = false;

  // simple logic we pass to the submit button, if the user dose not enter any values then we can not submit anything and the button will be disabled.

  if (userData.enteredDay && userData.enteredMonth) {
    formIsValid = true;
  }

  // Our main trigger function in the application that we call when the user hit submit(Get My Birthday).
  const getBirthdayHandler = (event) => {
    event.preventDefault();

    // If there is no entered values by the user then we return.
    if (!userData.enteredDay) return;

    if (!userData.enteredMonth) return;

    // We pass our main recived data to another component so that we can handle them from there.
    props.onGetBirthdayDate(userData);

    // We clean the inputs of our form by dispatching new action.
    dispatch({ type: "clean" });

    // We call this function in order to hide and show some new elements on the UI.
    props.onShowElements();
  };

  // These two functions we call inside of our form inputs whenever the user inputs value and the input change.
  const dayChangeHandler = (event) => {
    dispatch({ type: "day", value: event.target.value });
  };

  // Inside of them we dispatch a new action to update the sate and also get the entered values from the user.
  const monthChangeHandler = (event) => {
    dispatch({ type: "month", value: event.target.value });
  };

  return (
    <form onSubmit={getBirthdayHandler} className={classes.inputsAndButton}>
      <input
        type="number"
        className={classes.inputs}
        placeholder="Input Month"
        onChange={monthChangeHandler}
        min={1}
        max={12}
        value={userData.enteredMonth}
      />
      <input
        type="number"
        className={`${classes["day-input"]} ${classes.inputs}`}
        placeholder="Input Day"
        onChange={dayChangeHandler}
        min={1}
        max={31}
        value={userData.enteredDay}
      />
      <button
        disabled={!formIsValid}
        type="submit"
        className={classes["get-button"]}
      >
        Get My Birthday
      </button>
    </form>
  );
};

export default GetBirthday;
