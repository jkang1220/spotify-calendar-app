import React from "react";
import moment from "moment";
import WeekDayHeader from "./WeekDayHeader.jsx";
import CalendarHeader from "./CalendarHeader.jsx";
import Day from "./Day.jsx";

function generateCalendar(props) {
  let calendarArr = [];
  let daysInMonth = moment(props.currentDate).daysInMonth();

  let startOfMonth = moment(props.currentDate)
    .startOf("month")
    .format("d");

  for (let i = 0; i < startOfMonth; i++) {
    calendarArr.push("");
  }

  for (let j = 1; j <= daysInMonth; j++) {
    calendarArr.push(j);
  }
  return calendarArr;
}

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
      (currentMonth >= eventStartMonth && currentMonth <= eventEndMonth) &&
      (currentDate >= eventStartDate && currentDate <= eventEndDate)
    );
  });
}

class CalendarMonthView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarArr: generateCalendar(this.props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ calendarArr: generateCalendar(nextProps) });
  }

  render() {
    return (
      <div>
        <CalendarHeader
          view={this.props.view}
          nextMonth={this.props.nextMonth}
          previousMonth={this.props.previousMonth}
          currentDate={this.props.currentDate}
        />
        <WeekDayHeader view={this.props.view} />
        <div className="container-month">
          {this.state.calendarArr.map((day, i) => {
            return (
              <Day
                handleDayClick={this.props.handleDayClick}
                currentDate={this.props.currentDate}
                key={i}
                day={day}
                handleEventClick={this.props.handleEventClick}
                events={filterEventsByDay(
                  this.props.events,
                  moment(this.props.currentDate).month(),
                  day,
                  moment(this.props.currentDate).year()
                )}
              />
            );
          })}
        </div>
        <div />
      </div>
    );
  }
}

export default CalendarMonthView;
