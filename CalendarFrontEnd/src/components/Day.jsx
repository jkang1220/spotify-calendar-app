import React from "react";
import moment from "moment";
import Event from "./Event.jsx";

const Day = props => {
  return (
    <div
      className={props.day !== "" ? "day-item" : "blank-day-item "}
      onClick={() => {
        let date = moment(props.currentDate)
          .date(props.day)
          .toDate();
        props.handleDayClick(date);
      }}
    >
      {props.day}
      {props.events.map((event, i) => (
        <Event
          handleEventClick={props.handleEventClick}
          key={i}
          event={event}
        />
      ))}
    </div>
  );
};

export default Day;
