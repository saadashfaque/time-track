import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./styles.css";

const options = {
  indexAxis: "y",
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
  },
};

const generateColorArray = (num) => {
  let colorArray = [];
  for (let i = 0; i < num; i++) {
    colorArray.push("#" + Math.floor(Math.random() * 16777215).toString(16));
  }
  return colorArray;
};

const chartData = (type) => {
  const ls = JSON.parse(localStorage.getItem("data"));
  let labels = [],
    data = [];
  if (ls) {
    ls.forEach((entry) => {
      if (type === "daily") {
        if (labels.includes(entry.day)) {
          let i = labels.indexOf(entry.day);
          data[i] =
            data[i] +
            (entry.duration.hour * 60 +
              entry.duration.min +
              entry.duration.sec / 60);
        } else {
          labels.push(entry.day);
          data.push(
            entry.duration.hour * 60 +
              entry.duration.min +
              entry.duration.sec / 60
          );
        }
      } else {
        if (labels.includes(entry.month)) {
          let i = labels.indexOf(entry.month);
          data[i] =
            data[i] +
            (entry.duration.hour * 60 +
              entry.duration.min +
              entry.duration.sec / 60);
        } else {
          labels.push(entry.month);
          data.push(
            entry.duration.hour * 60 +
              entry.duration.min +
              entry.duration.sec / 60
          );
        }
      }
    });
  }

  const backgroundColor = generateColorArray(labels.length);

  return {
    labels,
    datasets: [
      {
        label: "No. of minutes worked",
        data,
        backgroundColor,
      },
    ],
  };
};

const Reports = () => {
  const [type, setType] = useState("daily");

  let data = chartData(type);

  return (
    <div className="Reports">
      <Select value={type} onChange={(e) => setType(e.target.value)}>
        <MenuItem value="daily">Daily</MenuItem>
        <MenuItem value="monthly">Monthly</MenuItem>
      </Select>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Reports;
