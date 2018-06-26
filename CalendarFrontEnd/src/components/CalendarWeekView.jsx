import React from "react";
import CalendarHeader from "./CalendarHeader.jsx";
import WeekDayHeader from "./WeekDayHeader.jsx";
import Day from "./Day.jsx";
import moment from "moment";

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

function generateWeekCalendar(props) {
  let calendarArr = [];
  let daysInMonth = moment(props.currentDate).daysInMonth();
  let startOfWeek = moment(props.currentDate)
    .startOf("week")
    .date();
  let startOfWeekDay = moment(props.currentDate)
    .startOf("week")
    .day();
  let endOfWeek = moment(props.currentDate)
    .endOf("week")
    .date();

  for (var i = 0; i < 7; i++) {
    if (startOfWeek + i <= daysInMonth) {
      calendarArr.push(startOfWeek + i);
    }
  }
  if (endOfWeek < startOfWeek) {
    for (var x = 1; x <= endOfWeek; x++) {
      calendarArr.push(x);
    }
  }

  return calendarArr;
}

class CalendarWeekView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekArr: generateWeekCalendar(this.props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => {
      return { weekArr: generateWeekCalendar(nextProps) };
    });
  }

  render() {
    return (
      <div>
        <CalendarHeader
          view={this.props.view}
          nextWeek={this.props.nextWeek}
          previousWeek={this.props.previousWeek}
          currentDate={this.props.currentDate}
        />
        <WeekDayHeader view={this.props.view} />
        <div className="container-month">
          {this.state.weekArr.map((day, i) => {
            return (
              <Day
                currentDate={this.props.currentDate}
                handleEventClick={this.props.handleEventClick}
                handleDayClick={this.props.handleDayClick}
                events={filterEventsByDay(
                  this.props.events,
                  moment(this.props.currentDate).month(),
                  day,
                  moment(this.props.currentDate).year()
                )}
                key={i}
                day={day}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
export default CalendarWeekView;
