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
    if (this.props.view === MONTH_VIEW) {
      return (
        <div className="calendar-header-container">
          <button
            className="calendar-header-button"
            onClick={this.props.previousMonth}
          >
            Previous Month
          </button>
          <h2 className="calendar-header-text">{`${
            MONTHS[this.state.currentMonth]
          } ${this.state.currentYear}`}</h2>
          <button
            className="calendar-header-button"
            onClick={this.props.nextMonth}
          >
            Next Month
          </button>
        </div>
      );
    } else if (this.props.view === WEEK_VIEW) {
      return (
        <div className="calendar-header-container">
          <button
            className="calendar-header-button"
            onClick={this.props.previousWeek}
          >
            Previous Week
          </button>
          <h2 className="calendar-header-text">{`${
            MONTHS[this.state.weekStartMonth]
          } ${this.state.weekStartDate}, ${this.state.weekStartYear} - ${
            MONTHS[this.state.weekEndMonth]
          } ${this.state.weekEndDate}, ${this.state.weekEndYear}`}</h2>
          <button
            className="calendar-header-button"
            onClick={this.props.nextWeek}
          >
            Next Week
          </button>
        </div>
      );
    } else if (this.props.view === DAY_VIEW) {
      return (
        <div className="calendar-header-container">
          <button
            className="calendar-header-button"
            onClick={this.props.previousDay}
          >
            Previous Day
          </button>
          <h2 className="calendar-header-text">{`${
            MONTHS[this.state.currentMonth]
          } ${moment(this.props.currentDate).date()},
           ${this.state.currentYear}`}</h2>
          <button
            className="calendar-header-button"
            onClick={this.props.nextDay}
          >
            Next Day
          </button>
        </div>
      );
    }
  }
}

export default CalendarHeader;
