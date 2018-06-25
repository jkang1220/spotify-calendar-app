import React from "react";
import CalendarHeader from "./CalendarHeader.jsx";
import Day from "./Day.jsx";
// import { MONTHS, WEEKDAYS } from "../../../constants.js";
import moment from "moment";
import WeekDayHeader from "./WeekDayHeader.jsx";

const CalendarDayView = props => {
  let dayOfWeek = moment(props.currentDate).day();
  let currDate = moment(props.currentDate).date();

  return (
    <div>
      <CalendarHeader
        view={props.view}
        nextDay={props.nextDay}
        currentDate={props.currentDate}
        previousDay={props.previousDay}
      />
      <WeekDayHeader
        view={props.view}
        currDay={props.currentDate}
        dayOfWeek={dayOfWeek}
      />
      <Day day={currDate} />;
    </div>
  );
};

export default CalendarDayView;
