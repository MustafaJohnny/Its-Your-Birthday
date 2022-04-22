import classes from "./CountersContainer.module.css";
import React from "react";

const CountersContainer = (props) => {
  return <div className={classes["countdown-container"]}>{props.children}</div>;
};

export default React.memo(CountersContainer);
