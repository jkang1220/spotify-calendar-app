import React from "react";
import moment from "moment";
import CalendarHeader from "./CalendarHeader.jsx";
import Day from "./Day.jsx";
import WeekDayHeader from "./WeekDayHeader.jsx";

function filterEventsByDay(events, date) {
  return events.filter(
    event =>
      moment(event.start_date)
        .startOf("day")
        .isSameOrBefore(moment(date).endOf("day")) &&
      moment(event.end_date)
        .endOf("day")
        .isSameOrAfter(moment(date).startOf("day"))
  );
}

const CalendarDayView = ({
  view,
  nextDay,
  previousDay,
  handleDayClick,
  handleEventClick,
  events,
  currentDate
}) => {
  return (
    <div>
      <CalendarHeader
        view={view}
        nextDay={nextDay}
        currentDate={currentDate}
        previousDay={previousDay}
      />
      <WeekDayHeader
        view={view}
        currDay={currentDate}
        dayOfWeek={moment(currentDate).day()}
      />
      <Day
        handleDayClick={handleDayClick}
        handleEventClick={handleEventClick}
        events={filterEventsByDay(events, currentDate)}
        day={currentDate}
      />;
    </div>
  );
};

export default CalendarDayView;
