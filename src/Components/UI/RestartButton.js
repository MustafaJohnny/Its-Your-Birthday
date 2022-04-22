import classes from "./RestartButton.module.css";
import React, { useCallback } from "react";

const RestartButton = (props) => {
  // Our function call when the restart app button is clicked, here we recive the function via props and then call it with the useCallback hook only when the props is changed.
  const restartApplication = useCallback(() => {
    props.onRestartApp();
  }, [props]);

  return (
    <button
      onClick={restartApplication}
      type="button"
      className={classes["start-button"]}
    >
      Restart App
    </button>
  );
};

export default React.memo(RestartButton);
