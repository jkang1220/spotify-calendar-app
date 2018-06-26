import React from "react";
import moment from "moment";

const Event = ({ event, handleEventClick }) => (
  <div
    className="event"
    onClick={e => {
      e.stopPropagation();
      handleEventClick(event);
    }}
  >
    <p>
      {event.description}
      <br />
      Start: {moment(event.start_date).format("MM/DD/YY h:mm A")}
      <br />
      End: {moment(event.end_date).format("MM/DD/YY h:mm A")}
    </p>
  </div>
);

export default Event;
