import React from "react";

const ViewOptionRadial = ({ view, updateView }) => (
  <div>
    <form>
      <input
        type="radio"
        name="view"
        value="MONTH"
        checked={view === "MONTH"}
        onChange={updateView}
      />
      Month View
      <input
        type="radio"
        name="view"
        value="WEEK"
        checked={view === "WEEK"}
        onChange={updateView}
      />
      Week View
      <input
        type="radio"
        name="view"
        value="DAY"
        checked={view === "DAY"}
        onChange={updateView}
      />
      Day View
    </form>
  </div>
);

export default ViewOptionRadial;
