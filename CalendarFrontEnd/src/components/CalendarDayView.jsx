import React from "react";
import CalendarHeader from "./CalendarHeader.jsx";
import Day from "./Day.jsx";
// import { MONTHS, WEEKDAYS } from "../../../constants.js";
import moment from "moment";
import WeekDayHeader from "./WeekDayHeader.jsx";

function filterEventsByDay(events, currentMonth, currentDate, currentYear) {
  return events.filter(events => {
    let eventStartMonth = moment(events.start_date).month();
    let eventStartYear = moment(events.start_date).year();
    let eventStartDate = moment(events.start_date).date();
    let eventEndMonth = moment(events.end_date).month();
    let eventEndYear = moment(events.end_date).year();
    let eventEndDate = moment(events.end_date).date();
    return (
      currentYear >= eventStartYear &&
      currentYear <= eventEndYear &&
      (currentMonth >= eventStartMonth && currentMonth <= eventStartMonth) &&
      (currentDate >= eventStartDate && currentDate <= eventEndDate)
    );
  });
}

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
      <Day
        handleDayClick={props.handleDayClick}
        handleEventClick={props.handleEventClick}
        events={filterEventsByDay(
          props.events,
          moment(props.currentDate).month(),
          currDate,
          moment(props.currentDate).year()
        )}
        day={currDate}
      />;
    </div>
  );
};

export default CalendarDayView;
