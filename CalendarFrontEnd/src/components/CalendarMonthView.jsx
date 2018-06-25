import React from "react";
import moment from "moment";
import WeekDayHeader from "./WeekDayHeader.jsx";
import CalendarHeader from "./CalendarHeader.jsx";
import Day from "./Day.jsx";

function generateCalendar(props) {
  let calendarArr = [];
  let daysInMonth = moment()
    .month(props.currMonth)
    .year(props.currYear)
    .daysInMonth();

  let startOfMonth = moment()
    .month(props.currMonth)
    .year(props.currYear)
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
        {/* <h1>CALENDAR MONTH VIEW</h1> */}
        <CalendarHeader
          view={this.props.view}
          nextMonth={this.props.nextMonth}
          previousMonth={this.props.previousMonth}
          currYear={this.props.currYear}
          currMonth={this.props.currMonth}
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
