import React from "react";
import CalendarHeader from "./CalendarHeader.jsx";
import WeekDayHeader from "./WeekDayHeader.jsx";
import Day from "./Day.jsx";
import moment from "moment";

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

function generateWeekCalendar(startDate) {
  var dates = [];
  for (var i = 0; i < 7; i++) {
    let day = moment(startDate)
      .add(i, "days")
      .format();
    dates.push(day);
  }
  return dates;
}

class CalendarWeekView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekArr: generateWeekCalendar(
        moment(this.props.currentDate).startOf("week"),
        moment(this.props.currentDate).endOf("week")
      )
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => {
      return {
        weekArr: generateWeekCalendar(
          moment(nextProps.currentDate).startOf("week"),
          moment(nextProps.currentDate).endOf("week")
        )
      };
    });
  }

  render() {
    let {
      events,
      view,
      nextWeek,
      previousWeek,
      currentDate,
      handleEventClick,
      handleDayClick
    } = this.props;

    return (
      <div>
        <CalendarHeader
          view={view}
          nextWeek={nextWeek}
          previousWeek={previousWeek}
          currentDate={currentDate}
        />
        <WeekDayHeader view={view} />
        <div className="container-month">
          {this.state.weekArr.map((date, i) => {
            return (
              <Day
                currentDate={currentDate}
                handleEventClick={handleEventClick}
                handleDayClick={handleDayClick}
                events={filterEventsByDay(events, date)}
                key={i}
                day={date}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
export default CalendarWeekView;
