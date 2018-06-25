import React from "react";

const Day = props => (
  <div className={props.day !== "" ? "day-item" : "blank-day-item "}>
    {props.day}
  </div>
);

export default Day;
