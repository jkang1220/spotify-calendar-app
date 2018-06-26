import React from "react";
import { DAY_VIEW, WEEKDAYS } from "../../../constants.js";

const WeekDayHeader = ({ view, dayOfWeek }) => {
  if (view !== DAY_VIEW) {
    return (
      <div className="header-week-container">
        {WEEKDAYS.map((day, i) => (
          <div className="weekday-item" key={i}>
            {day}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="header-day">
        {[WEEKDAYS[dayOfWeek]].map((day, i) => (
          <div className="weekday-item" key={i}>
            {day}
          </div>
        ))}
      </div>
    );
  }
};

export default WeekDayHeader;
