import React from "react";
import axios from "axios";
import ReactModal from "react-modal";
import moment from "moment";

ReactModal.setAppElement("#app");

class AddEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: this.props.selectedDate.start_date,
      end_date: this.props.selectedDate.end_date,
      description: ""
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.cancelEvent = this.cancelEvent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => {
      return {
        start_date: moment(this.props.selectedDate.start_date)
          .hour(0)
          .minute(0)
          .second(0)
          .format("YYYY-MM-DDThh:mm"),
        end_date: moment(this.props.selectedDate.end_date)
          .hour(0)
          .minute(0)
          .second(0)
          .format("YYYY-MM-DDThh:mm")
      };
    });
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addEvent(e) {
    let event = this.state;
    if (event.start_date && event.start_date && event.description !== "") {
      axios
        .post("/events", event)
        .then(res => {
          this.setState(
            {
              start_date: "",
              end_date: "",
              description: ""
            },
            () => {
              this.props.getAllEvents();
              this.props.toggleAddModal();
            }
          );
        })
        .catch(err => {
          console.error("Error Saving Event", err);
        });
    } else {
      alert(
        "Please make sure you have entered a Start Date, End Date, and Description!"
      );
    }
  }

  cancelEvent(e) {
    this.setState({
      start_date: "",
      end_date: "",
      description: ""
    });
  }

  render() {
    return (
      <div>
        <ReactModal
          className="modal"
          isOpen={this.props.showAddModal}
          contentLabel="Add Event Modal"
        >
          <form className="form-container" onSubmit={this.addEvent}>
            <h1>Add Event:</h1>
            <div className="form-item">
              <span>Start Date/Time: </span>
              <input
                type="datetime-local"
                name="start_date"
                className="input-field"
                value={this.state.start_date}
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-item">
              <span>End Date/Time: </span>
              <input
                type="datetime-local"
                name="end_date"
                className="input-field"
                value={this.state.end_date}
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-item">
              <span>Description: </span>
              <input
                type="text"
                name="description"
                className="input-field"
                size="30"
                value={this.state.description}
                onChange={this.onChangeHandler}
              />
            </div>
            <button type="button" onClick={this.addEvent}>
              Save Event
            </button>
            <button type="button" onClick={this.props.toggleAddModal}>
              Cancel
            </button>
          </form>
        </ReactModal>
      </div>
    );
  }
}

export default AddEventModal;
