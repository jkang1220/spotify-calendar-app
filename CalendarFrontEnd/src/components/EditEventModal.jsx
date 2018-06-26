import React from "react";
import axios from "axios";
import ReactModal from "react-modal";
import moment from "moment";

ReactModal.setAppElement("#app");

class EditEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: this.props.editEvent.start_date,
      end_date: this.props.editEvent.end_date,
      description: this.props.editEvent.description,
      _id: this.props.editEvent._id
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      start_date: nextProps.editEvent.start_date,
      end_date: nextProps.editEvent.end_date,
      description: nextProps.editEvent.description,
      _id: nextProps.editEvent._id
    });
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  editEvent() {
    let event = this.state;
    let id = this.state._id;
    axios
      .put(`/events/${id}`, event)
      .then(res => {
        this.setState(
          {
            start_date: "",
            end_date: "",
            description: "",
            _id: ""
          },
          () => {
            this.props.getAllEvents();
            this.props.toggleEditEventModal();
          }
        );
      })
      .catch(err => {
        console.error("Error Saving Event", err);
      });
  }

  deleteEvent() {
    let id = this.state._id;
    axios
      .delete(`/events/${id}`)
      .then(res => {
        this.setState(
          {
            start_date: "",
            end_date: "",
            description: "",
            _id: ""
          },
          () => {
            this.props.getAllEvents();
            this.props.toggleEditEventModal();
          }
        );
      })
      .catch(err => {
        console.error("Error Saving Event", err);
      });
  }

  render() {
    return (
      <div>
        <ReactModal
          className="modal"
          isOpen={this.props.showEditModal}
          contentLabel="Edit Modal"
        >
          <form className="form-container" onSubmit={this.addEvent}>
            <h1>Edit Event:</h1>
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
            <button type="button" onClick={this.editEvent}>
              Edit Event
            </button>
            <button type="button" onClick={this.deleteEvent}>
              Delete Event
            </button>
            <button type="button" onClick={this.props.toggleEditEventModal}>
              Cancel
            </button>
          </form>
        </ReactModal>
      </div>
    );
  }
}

export default EditEventModal;
