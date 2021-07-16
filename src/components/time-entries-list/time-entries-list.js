import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";

import "./styles.css";

const TimeEntriesList = ({ data, setData }) => {
  const [editable, setEditable] = useState(false);
  const [editKey, setEditKey] = useState("");

  const editTask = (editKey) => {
    setEditable((prevState) => !prevState);
    setEditKey(editKey);
  };

  const editTaskTitle = (editKey, title) => {
    let newData = [...data];

    let d = newData.map((val, key) =>
      key === editKey ? { ...val, title: title } : val
    );
    setData(d);
    localStorage.setItem("data", JSON.stringify(d));
  };

  const removeTask = (removeKey) => {
    let newData = [...data];
    let d = newData.filter((val, key) => key !== removeKey);
    setData(d);
    localStorage.setItem("data", JSON.stringify(d));
  };

  return (
    <table border="1" frame="void" rules="rows">
      <thead className="head">
        <tr>
          <th>Title</th>
          <th>Time (From - To)</th>
          <th>Duration (HH:MM:SS)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((value, key) => (
            <tr key={key}>
              <td>
                {editKey === key && editable ? (
                  <TextField
                    id="outlined-basic"
                    placeholder="Write your task title here."
                    variant="outlined"
                    value={value.title}
                    onChange={(e) => editTaskTitle(editKey, e.target.value)}
                  />
                ) : value.title ? (
                  value.title
                ) : (
                  "-"
                )}
              </td>
              <td>
                {value.start} - {value.end}
              </td>
              <td>
                {value.duration.hour} : {value.duration.min} :{" "}
                {value.duration.sec}
              </td>
              <td>
                <IconButton onClick={() => editTask(key)}>
                  {editKey === key && editable ? (
                    <DoneIcon color="primary" />
                  ) : (
                    <EditIcon color="primary" />
                  )}
                </IconButton>
                <IconButton onClick={() => removeTask(key)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No tasks available in the list</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TimeEntriesList;
