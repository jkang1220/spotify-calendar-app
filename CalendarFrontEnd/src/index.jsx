import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import moment from "moment";
import AddEventModal from "./components/AddEventModal.jsx";
import CalendarMonthView from "./components/CalendarMonthView.jsx";
import CalendarWeekView from "./components/CalendarWeekView.jsx";
import CalendarDayView from "./components/CalendarDayView.jsx";
import ViewOptionRadial from "./components/ViewOptionRadial.jsx";
import EditEventModal from "./components/EditEventModal.jsx";
import { MONTH_VIEW, WEEK_VIEW, DAY_VIEW } from "../../constants.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      showAddModal: false,
      showEditModal: false,
      view: MONTH_VIEW,
      currentDate: moment().toDate(),
      selectedDate: {
        start_date: "",
        end_date: "",
        description: ""
      },
      editEvent: {
        start_date: "",
        end_date: "",
        description: "",
        _id: ""
      }
    };
    this.updateView = this.updateView.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.toggleEditEventModal = this.toggleEditEventModal.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.nextDay = this.nextDay.bind(this);
    this.previousDay = this.previousDay.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.previousWeek = this.previousWeek.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
    this.getAllEvents = this.getAllEvents.bind(this);
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
        this.setState({ events: res.data });
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

  handleDayClick(day) {
    this.setState(
      prevState => {
        return {
          selectedDate: {
            start_date: moment(day).toDate(),
            end_date: moment(day).toDate(),
            description: ""
          }
        };
      },
      () => {
        this.toggleAddModal();
      }
    );
  }

  handleEventClick(event) {
    this.setState({ editEvent: event }, () => {
      this.toggleEditEventModal();
    });
  }

  toggleEditEventModal() {
    let temp = this.state.showEditModal;
    this.setState({ showEditModal: !temp });
  }

  render() {
    let {
      view,
      currentDate,
      events,
      editEvent,
      selectedDate,
      showAddModal,
      showEditModal
    } = this.state;

    return (
      <div className="container">
        <div>
          <h1>Jimmy's Spotify Calendar</h1>
          <ViewOptionRadial view={view} updateView={this.updateView} />
        </div>
        {view === MONTH_VIEW ? (
          <CalendarMonthView
            view={view}
            currentDate={currentDate}
            nextMonth={this.nextMonth}
            previousMonth={this.previousMonth}
            handleDayClick={this.handleDayClick}
            handleEventClick={this.handleEventClick}
            events={events}
          />
        ) : null}
        {view === WEEK_VIEW ? (
          <CalendarWeekView
            view={view}
            nextWeek={this.nextWeek}
            currentDate={currentDate}
            previousWeek={this.previousWeek}
            handleDayClick={this.handleDayClick}
            handleEventClick={this.handleEventClick}
            events={events}
          />
        ) : null}
        {view === DAY_VIEW ? (
          <CalendarDayView
            view={view}
            nextDay={this.nextDay}
            currentDate={currentDate}
            previousDay={this.previousDay}
            handleDayClick={this.handleDayClick}
            handleEventClick={this.handleEventClick}
            events={events}
          />
        ) : null}
        <AddEventModal
          selectedDate={selectedDate}
          showAddModal={showAddModal}
          toggleAddModal={this.toggleAddModal}
          getAllEvents={this.getAllEvents}
        />
        <EditEventModal
          editEvent={editEvent}
          getAllEvents={this.getAllEvents}
          showEditModal={showEditModal}
          toggleEditEventModal={this.toggleEditEventModal}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
