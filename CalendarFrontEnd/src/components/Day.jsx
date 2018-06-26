import React from "react";
import moment from "moment";
import Event from "./Event.jsx";

const Day = ({ day, events, handleDayClick, handleEventClick }) => {
  return (
    <div
      className={day !== "" ? "day-item" : "blank-day-item "}
      onClick={() => {
        if (day !== "") {
          handleDayClick(day);
        }
      }}
    >
      {moment(day).date() || ""}
      {events.map((event, i) => (
        <Event handleEventClick={handleEventClick} key={i} event={event} />
      ))}
    </div>
  );
};

export default Day;
