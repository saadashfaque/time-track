import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import "./styles.css";

let timex;

const TimeEntryForm = ({ setData }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState({
    sec: 0,
    min: 0,
    hour: 0,
  });

  const tick = () => {
    setTimer((prevState) => {
      let h = prevState.hour,
        m = prevState.min,
        s;
      s = prevState.sec + 1;
      if (s >= 60) {
        h = prevState.hour;
        m = prevState.min + 1;
        s = 0;

        if (m >= 60) {
          h = prevState.hour + 1;
          m = 0;
          s = 0;
        }
      }
      return {
        hour: h,
        min: m,
        sec: s,
      };
    });
  };

  const startTimer = () => {
    setStarted(true);
    let now = new Date();
    let day = now.toDateString().slice(4, 15);
    let month = now.toUTCString().slice(8, 16);
    let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    setStart(time);
    setDay(day);
    setMonth(month);
    timex = setInterval(() => tick(), 1000);
  };

  const stopTimer = () => {
    setStarted(false);
    clearInterval(timex);
    setTitle("");
    setTimer({
      hour: 0,
      min: 0,
      sec: 0,
    });
    let now = new Date();
    let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    // push data to table
    setData((prevState) => {
      let data = [...prevState];

      data.push({
        title: title,
        duration: timer,
        start: start,
        end: time,
        day: day,
        month: month,
      });

      localStorage.setItem("data", JSON.stringify(data));
      setData(data);
    });
  };

  const resetTimer = () => {
    setStarted(false);
    clearInterval(timex);
    setTitle("");
    setTimer({
      hour: 0,
      min: 0,
      sec: 0,
    });
  };

  return (
    <div className="TimeEntryForm">
      <div className="row">
        <div className="col-4 input-container">
          <TextField
            id="outlined-basic"
            placeholder="Write your task title here."
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-4">
          <p className="Timer">
            {timer.hour} : {timer.min} : {timer.sec}
          </p>
        </div>
        <div className="col-4">
          <>
            {started ? (
              <Tooltip title="Stop" aria-label="stop">
                <IconButton aria-label="start" onClick={stopTimer}>
                  <StopIcon color="error" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Start Timer" aria-label="start">
                <IconButton aria-label="start" onClick={startTimer}>
                  <PlayArrowIcon className="PlayArrowIcon" />
                </IconButton>
              </Tooltip>
            )}
            {started && (
              <Tooltip title="Reset" aria-label="reset">
                <IconButton aria-label="start" onClick={resetTimer}>
                  <RotateLeftIcon color="action" />
                </IconButton>
              </Tooltip>
            )}
          </>
        </div>
        <hr className="Divider" />
      </div>
    </div>
  );
};

export default TimeEntryForm;
