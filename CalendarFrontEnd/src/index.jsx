import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import AddEventModal from "./components/AddEventModal.jsx";
import CalendarMonthView from "./components/CalendarMonthView.jsx";
import CalendarWeekView from "./components/CalendarWeekView.jsx";
import CalendarDayView from "./components/CalendarDayView.jsx";
import ViewOptionRadial from "./components/ViewOptionRadial.jsx";

import moment from "moment";
import { MONTH_VIEW, WEEK_VIEW, DAY_VIEW } from "../../constants.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    let today = new Date();
    this.state = {
      events: [],
      view: MONTH_VIEW,
      currMonth: today.getMonth(),
      currDay: today.getDate(),
      currYear: today.getFullYear()
    };
    this.updateView = this.updateView.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.nextDay = this.nextDay.bind(this);
    this.previousDay = this.previousDay.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.previousWeek = this.previousWeek.bind(this);
  }

  //get all events when component mounts
  componentDidMount() {
    this.getAllEvents();
  }

  //request to get all events
  getAllEvents() {
    axios
      .get("/events")
      .then(res => {
        this.setState({ events: res.data }, () => {
          console.log("events Fetched:", this.state.events);
        });
      })
      .catch(err => {
        console.error("Error occured while fetching events", err);
      });
  }

  toggleAddModal() {
    let temp = this.state.showAddModal;
    this.setState({ showAddModal: !temp });
  }

  //updates view for the Month, Week, Day views
  updateView(e) {
    let view = e.target.value;
    this.setState({ view });
  }

  nextMonth() {
    let month = this.state.currMonth === 11 ? 0 : this.state.currMonth + 1;
    let year =
      this.state.currMonth === 11
        ? this.state.currYear + 1
        : this.state.currYear;
    this.setState({ currMonth: month, currYear: year });
  }

  previousMonth() {
    let month = this.state.currMonth === 0 ? 11 : this.state.currMonth - 1;
    let year =
      this.state.currMonth === 0
        ? this.state.currYear - 1
        : this.state.currYear;
    this.setState({ currMonth: month, currYear: year });
  }

  nextWeek() {
    let currDay = this.state.currDay;
    let currYear = this.state.currYear;
    let currMonth = this.state.currMonth;

    for (var i = 0; i < 7; i++) {
      this.nextDay();
    }
  }

  previousWeek() {
    for (var i = 0; i < 7; i++) {
      this.previousDay();
    }
  }

  nextDay() {
    let numberOfDays = moment()
      .month(this.state.currMonth)
      .year(this.state.currYear)
      .daysInMonth();

    if (this.state.currDay === numberOfDays) {
      this.nextMonth();
      this.setState({ currDay: 1 });
    } else {
      let currDay = this.state.currDay + 1;
      this.setState({ currDay });
    }
  }

  previousDay() {
    let currDay = this.state.currDay;

    if (currDay === 1) {
      this.previousMonth();
      let numberOfDays = moment()
        .month(this.state.currMonth)
        .year(this.state.currYear)
        .daysInMonth();
      this.setState({ currDay: numberOfDays });
    } else {
      this.setState({ currDay: currDay - 1 });
    }
  }
  render() {
    return (
      <div className="container">
        <div>
          <h1>Jimmy's Spotify Calendar</h1>
          <ViewOptionRadial
            view={this.state.view}
            updateView={this.updateView}
          />
        </div>
        {this.state.view === MONTH_VIEW ? (
          <CalendarMonthView
            view={this.state.view}
            currMonth={this.state.currMonth}
            currYear={this.state.currYear}
            nextMonth={this.nextMonth}
            previousMonth={this.previousMonth}
          />
        ) : null}
        {this.state.view === WEEK_VIEW ? (
          <CalendarWeekView
            view={this.state.view}
            currDay={this.state.currDay}
            currMonth={this.state.currMonth}
            currYear={this.state.currYear}
            nextWeek={this.nextWeek}
            previousWeek={this.previousWeek}
          />
        ) : null}
        {this.state.view === DAY_VIEW ? (
          <CalendarDayView
            view={this.state.view}
            currDay={this.state.currDay}
            currMonth={this.state.currMonth}
            currYear={this.state.currYear}
            nextDay={this.nextDay}
            previousDay={this.previousDay}
          />
        ) : null}
        {/* <AddEventModal
          showAddModal={this.state.showAddModal}
          toggleAddModal={this.toggleAddModal}
        /> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
