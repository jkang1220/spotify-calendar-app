import React from "react";
import CalendarHeader from "./CalendarHeader.jsx";
import WeekDayHeader from "./WeekDayHeader.jsx";
import Day from "./Day.jsx";
import moment from "moment";

function generateWeekCalendar(props) {
  let calendarArr = [];

  let startOfWeek = moment()
    .date(props.currDay)
    .month(props.currMonth)
    .year(props.currYear)
    .startOf("week")
    .date();

  let endOfWeek = moment()
    .date(props.currDay)
    .month(props.currMonth)
    .year(props.currYear)
    .endOf("week")
    .date();

  for (var i = startOfWeek; i <= endOfWeek; i++) {
    calendarArr.push(i);
  }
  return calendarArr;
}

const CalendarWeekView = props => {
  let weekArr = generateWeekCalendar(props);

  return (
    <div>
      CALENDAR WEEK VIEW
      <CalendarHeader
        view={props.view}
        nextWeek={props.nextWeek}
        previousWeek={props.previousWeek}
        currDay={props.currDay}
        currMonth={props.currMonth}
        currYear={props.currYear}
      />
      <WeekDayHeader view={props.view} />
      <div className="container-month">
        {weekArr.map((day, i) => {
          return <Day key={i} day={day} />;
        })}
      </div>
    </div>
  );
};

export default CalendarWeekView;
