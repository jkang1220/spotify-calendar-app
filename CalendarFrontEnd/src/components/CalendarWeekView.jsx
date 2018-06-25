import React from "react";
import CalendarHeader from "./CalendarHeader.jsx";
import WeekDayHeader from "./WeekDayHeader.jsx";
import Day from "./Day.jsx";
import moment from "moment";

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
            return <Day key={i} day={day} />;
          })}
        </div>
      </div>
    );
  }
}
export default CalendarWeekView;
