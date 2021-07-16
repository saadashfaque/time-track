import React from "react";
import { useState } from "react";

import TimeEntryForm from "../time-entry-form/time-entry-form";
import TimeEntriesList from "../time-entries-list/time-entries-list";

import "./styles.css";

const Tracker = () => {
  const [data, setData] = useState(
    localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
  );

  return (
    <div className="Tracker">
      <div className="row">
        <TimeEntryForm setData={setData} />
        <TimeEntriesList data={data} setData={setData} />
      </div>
    </div>
  );
};

export default Tracker;
