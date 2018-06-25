import React from "react";
import CalendarHeader from "./CalendarHeader.jsx";
import Day from "./Day.jsx";
// import { MONTHS, WEEKDAYS } from "../../../constants.js";
import moment from "moment";
import WeekDayHeader from "./WeekDayHeader.jsx";

const CalendarDayView = props => {
  let dayOfWeek = moment()
    .date(props.currDay)
    .month(props.currMonth)
    .year(props.currYear)
    .day();

  return (
    <div>
      CALENDAR DAY VIEW
      <CalendarHeader
        view={props.view}
        nextDay={props.nextDay}
        previousDay={props.previousDay}
        currDay={props.currDay}
        currMonth={props.currMonth}
        currYear={props.currYear}
      />
      <WeekDayHeader
        view={props.view}
        currDay={props.currDay}
        dayOfWeek={dayOfWeek}
      />
      <Day day={props.currDay} />;
    </div>
  );
};

export default CalendarDayView;
