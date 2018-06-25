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
    // let today = new Date();
    this.state = {
      events: [],
      view: MONTH_VIEW,
      currentDate: moment().toDate()
    };
    // currMonth: today.getMonth(),
    // currDay: today.getDate(),
    // currYear: today.getFullYear()
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
    let currentDate = this.state.currentDate;
    this.setState(prevstate => {
      return {
        currentDate: moment(prevstate.currentDate)
          .add(1, "months")
          .toDate()
      };
    });
  }

  previousMonth() {
    let currentDate = this.state.currentDate;
    this.setState(prevstate => {
      return {
        currentDate: moment(prevstate.currentDate)
          .subtract(1, "months")
          .toDate()
      };
    });
  }

  nextWeek() {
    let currentDate = this.state.currentDate;
    this.setState(prevstate => {
      return {
        currentDate: moment(prevstate.currentDate)
          .add(1, "weeks")
          .toDate()
      };
    });
  }

  previousWeek() {
    let currentDate = this.state.currentDate;
    this.setState(prevstate => {
      return {
        currentDate: moment(prevstate.currentDate)
          .subtract(1, "weeks")
          .toDate()
      };
    });
  }

  nextDay() {
    let currentDate = this.state.currentDate;
    this.setState(prevstate => {
      return {
        currentDate: moment(prevstate.currentDate)
          .add(1, "days")
          .toDate()
      };
    });
  }

  previousDay() {
    let currentDate = this.state.currentDate;
    this.setState(prevstate => {
      return {
        currentDate: moment(prevstate.currentDate)
          .subtract(1, "days")
          .toDate()
      };
    });
  }

  render() {
    console.log("APP WAS RE-RENDERED", this.state);
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
            currentDate={this.state.currentDate}
            nextMonth={this.nextMonth}
            previousMonth={this.previousMonth}
          />
        ) : null}
        {this.state.view === WEEK_VIEW ? (
          <CalendarWeekView
            view={this.state.view}
            nextWeek={this.nextWeek}
            currentDate={this.state.currentDate}
            previousWeek={this.previousWeek}
          />
        ) : null}
        {this.state.view === DAY_VIEW ? (
          <CalendarDayView
            view={this.state.view}
            nextDay={this.nextDay}
            currentDate={this.state.currentDate}
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
