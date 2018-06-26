import React from "react";
import moment from "moment";

const Event = props => (
  <div
    className="event"
    onClick={e => {
      e.stopPropagation();
      props.handleEventClick(props.event);
    }}
  >
    <p>
      {props.event.description}
      <br />
      Start: {moment(props.event.start_date).format("MM/DD/YY h:mm A")}
      <br />
      End: {moment(props.event.end_date).format("MM/DD/YY h:mm A")}
    </p>
  </div>
);

export default Event;
