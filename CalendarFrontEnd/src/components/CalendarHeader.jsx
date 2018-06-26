import React from "react";
import moment from "moment";
import { MONTHS, DAY_VIEW, WEEK_VIEW, MONTH_VIEW } from "../../../constants.js";

class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: moment(this.props.currentDate).month(),
      currentYear: moment(this.props.currentDate).year(),
      weekStartMonth: moment(this.props.currentDate)
        .startOf("week")
        .month(),
      weekStartDate: moment(this.props.currentDate)
        .startOf("week")
        .date(),
      weekEndMonth: moment(this.props.currentDate)
        .endOf("week")
        .month(),
      weekEndDate: moment(this.props.currentDate)
        .endOf("week")
        .date(),
      weekEndYear: moment(this.props.currentDate)
        .endOf("week")
        .year(),
      weekStartYear: moment(this.props.currentDate)
        .startOf("week")
        .year()
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => {
      return {
        currentMonth: moment(nextProps.currentDate).month(),
        currentYear: moment(nextProps.currentDate).year(),
        weekStartMonth: moment(nextProps.currentDate)
          .startOf("week")
          .month(),
        weekStartDate: moment(nextProps.currentDate)
          .startOf("week")
          .date(),
        weekEndMonth: moment(nextProps.currentDate)
          .endOf("week")
          .month(),
        weekEndDate: moment(nextProps.currentDate)
          .endOf("week")
          .date(),
        weekEndYear: moment(nextProps.currentDate)
          .endOf("week")
          .year(),
        weekStartYear: moment(nextProps.currentDate)
          .startOf("week")
          .year()
      };
    });
  }

  render() {
    let {
      view,
      previousMonth,
      nextMonth,
      previousWeek,
      nextWeek,
      previousDay,
      nextDay,
      currentDate
    } = this.props;
    let {
      currentMonth,
      currentYear,
      weekStartMonth,
      weekStartDate,
      weekStartYear,
      weekEndDate,
      weekEndMonth,
      weekEndYear
    } = this.state;
    if (view === MONTH_VIEW) {
      return (
        <div className="calendar-header-container">
          <button className="calendar-header-button" onClick={previousMonth}>
            Previous Month
          </button>
          <h2 className="calendar-header-text">{`${
            MONTHS[currentMonth]
          } ${currentYear}`}</h2>
          <button className="calendar-header-button" onClick={nextMonth}>
            Next Month
          </button>
        </div>
      );
    } else if (view === WEEK_VIEW) {
      return (
        <div className="calendar-header-container">
          <button className="calendar-header-button" onClick={previousWeek}>
            Previous Week
          </button>
          <h2 className="calendar-header-text">{`${
            MONTHS[weekStartMonth]
          } ${weekStartDate}, ${weekStartYear} - ${
            MONTHS[weekEndMonth]
          } ${weekEndDate}, ${weekEndYear}`}</h2>
          <button className="calendar-header-button" onClick={nextWeek}>
            Next Week
          </button>
        </div>
      );
    } else if (view === DAY_VIEW) {
      return (
        <div className="calendar-header-container">
          <button className="calendar-header-button" onClick={previousDay}>
            Previous Day
          </button>
          <h2 className="calendar-header-text">{`${
            MONTHS[currentMonth]
          } ${moment(currentDate).date()},
           ${currentYear}`}</h2>
          <button className="calendar-header-button" onClick={nextDay}>
            Next Day
          </button>
        </div>
      );
    }
  }
}

export default CalendarHeader;
