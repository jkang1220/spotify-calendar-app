import React from "react";
import moment from "moment";
import WeekDayHeader from "./WeekDayHeader.jsx";
import CalendarHeader from "./CalendarHeader.jsx";
import Day from "./Day.jsx";

function generateCalendar(date) {
  let calendarArr = [];
  let daysInMonth = moment(date).daysInMonth();
  let month = moment(date).month();
  let year = moment(date).year();

  let startOfMonth = moment(date)
    .startOf("month")
    .format("d");

  for (let i = 0; i < startOfMonth; i++) {
    calendarArr.push("");
  }

  for (let j = 1; j <= daysInMonth; j++) {
    let day = moment()
      .year(year)
      .month(month)
      .date(j);
    calendarArr.push(day);
  }
  return calendarArr;
}

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

class CalendarMonthView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarArr: generateCalendar(this.props.currentDate)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ calendarArr: generateCalendar(nextProps.currentDate) });
  }

  render() {
    let {
      view,
      nextMonth,
      previousMonth,
      currentDate,
      events,
      handleEventClick,
      handleDayClick
    } = this.props;
    return (
      <div>
        <CalendarHeader
          view={view}
          nextMonth={nextMonth}
          previousMonth={previousMonth}
          currentDate={currentDate}
        />
        <WeekDayHeader view={view} />
        <div className="container-month">
          {this.state.calendarArr.map((day, i) => {
            return (
              <Day
                currentDate={currentDate}
                key={i}
                day={day}
                events={filterEventsByDay(
                  events,
                  day,
                  moment(currentDate).month(),
                  moment(currentDate).year()
                )}
                handleEventClick={handleEventClick}
                handleDayClick={handleDayClick}
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
