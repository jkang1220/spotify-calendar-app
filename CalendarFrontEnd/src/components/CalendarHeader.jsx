import React from "react";
import { MONTHS, DAY_VIEW, WEEK_VIEW, MONTH_VIEW } from "../../../constants.js";

const CalendarHeader = props => {
  if (props.view === MONTH_VIEW) {
    return (
      <div className="calendar-header-container">
        <button
          className="calendar-header-button"
          onClick={props.previousMonth}
        >
          Previous Month
        </button>
        <h2 className="calendar-header-text">{`${MONTHS[props.currMonth]} ${
          props.currYear
        }`}</h2>
        <button className="calendar-header-button" onClick={props.nextMonth}>
          Next Month
        </button>
      </div>
    );
  } else if (props.view === WEEK_VIEW) {
    return (
      <div className="calendar-header-container">
        <button className="calendar-header-button" onClick={props.previousWeek}>
          Previous Week
        </button>
        <h2 className="calendar-header-text">{`${MONTHS[props.currMonth]} ${
          props.currYear
        }`}</h2>
        <button className="calendar-header-button" onClick={props.nextWeek}>
          Next Week
        </button>
      </div>
    );
  } else if (props.view === DAY_VIEW) {
    return (
      <div className="calendar-header-container">
        <button className="calendar-header-button" onClick={props.previousDay}>
          Previous Day
        </button>
        <h2 className="calendar-header-text">{`${MONTHS[props.currMonth]} ${
          props.currDay
        }, ${props.currYear}`}</h2>
        <button className="calendar-header-button" onClick={props.nextDay}>
          Next Day
        </button>
      </div>
    );
  }
};

export default CalendarHeader;
