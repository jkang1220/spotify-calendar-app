import React from "react";

class ViewOptionRadial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="radio"
            name="view"
            value="MONTH"
            checked={this.props.view === "MONTH"}
            onChange={this.props.updateView}
          />
          Month View
          <input
            type="radio"
            name="view"
            value="WEEK"
            checked={this.props.view === "WEEK"}
            onChange={this.props.updateView}
          />
          Week View
          <input
            type="radio"
            name="view"
            value="DAY"
            checked={this.props.view === "DAY"}
            onChange={this.props.updateView}
          />
          Day View
        </form>
      </div>
    );
  }
}

export default ViewOptionRadial;
