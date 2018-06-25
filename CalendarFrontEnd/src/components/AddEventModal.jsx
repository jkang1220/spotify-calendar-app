import React from "react";
import axios from "axios";
import ReactModal from "react-modal";

ReactModal.setAppElement("#app");

class AddEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: "",
      end_date: "",
      description: ""
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.cancelEvent = this.cancelEvent.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addEvent(e) {
    let event = this.state;
    axios
      .post("/events", event)
      .then(res => {
        console.log("results from add event", res);
        this.props.toggleAddModal();
      })
      .catch(err => {
        console.error("Error Saving Event", err);
      });
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
        <button onClick={this.props.toggleAddModal}>Trigger Modal</button>
        <ReactModal
          isOpen={this.props.showAddModal}
          contentLabel="Minimal Modal toggleAddModal"
        >
          {" "}
          <form onSubmit={this.addEvent}>
            <input
              type="datetime-local"
              name="start_date"
              onChange={this.onChangeHandler}
            />
            <input
              type="datetime-local"
              name="end_date"
              onChange={this.onChangeHandler}
            />
            <input
              type="text"
              name="description"
              onChange={this.onChangeHandler}
            />
            <button type="button" onClick={this.addEvent}>
              Save Event
            </button>
          </form>
          <button onClick={this.props.toggleAddModal}>Cancel</button>
        </ReactModal>
      </div>
    );
  }
}

export default AddEventModal;
