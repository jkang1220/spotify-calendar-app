import React from "react";
import moment from "moment";
import WeekDayHeader from "./WeekDayHeader.jsx";
import CalendarHeader from "./CalendarHeader.jsx";
import Day from "./Day.jsx";

function generateCalendar(props) {
  console.log("props recieved in generateCalendar", props);
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
            return <Day key={i} day={day} />;
          })}
        </div>
        <div />
      </div>
    );
  }
}

export default CalendarMonthView;
