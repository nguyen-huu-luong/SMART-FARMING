import moment from "moment";
import StatusBar from "../Components/StatusBar";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import socketIOClient from "socket.io-client";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import { getEnviromentParams, updateHumidity, updateLight, updateTemperature } from "../redux/features/recordSlice";
import { getUnit } from "../helper/helper";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);
const host = "http://localhost:3001";
const labels = [
  "11 March",
  " 12 March",
  " 13 March",
  "14 March",
  "15 March",
  "16 March",
];

const data = {
  labels,
  datasets: [
    {
      type: "line",
      label: "Temperature",
      borderColor: "rgb(233, 101, 45)",
      borderWidth: 2,
      fill: false,
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    },
    {
      type: "bar",
      label: "Soil humidity",
      backgroundColor: "rgb(14, 156, 255)",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "white",
      maxBarThickness: 30,
      borderWidth: 2,
    },
  ],
};

// let enviromentParams = [
//   {
//     type: "Temperature",
//     value: 37,
//     unit: "°C",
//     compare: -2,
//     lastUpdated: moment(new Date()).format("h:mm A, MMMM Do YYYY"),
//   },
//   {
//     type: "Soil humidity",
//     value: 75,
//     unit: "%",
//     compare: 15,  
//     lastUpdated: moment(new Date()).format("h:mm A, MMMM Do YYYY"),
//   },
//   {
//     type: "Light",
//     value: 1800,
//     unit: "LUX",
//     compare: 34,
//     lastUpdated: moment(new Date()).format("h:mm A, MMMM Do YYYY"),
//   },
// ];
function DataBox({ data }) {
  if (data === {}) return <></> 
  let color = "#0E9CFF";
  if (data.type === "Temp") color = "#E9652D";
  else if (data.type === "Light") color = "#FFD600";
  return (
    <Col
      className="bg-white shadow p-3"
      style={{ borderBottom: `6px solid ${color}`, borderRadius: 8 }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <span>{data.type}</span>
        <span style={{ color: color }}>
          {data.value + ` (${getUnit(data.type)})`}
        </span>
      </div>
      <div className="my-2">
        {data.compare && data.compare >= 0 ? (
          <span>
            <AiFillUpCircle color={color} size={24} />
          </span>
        ) : (
          <span>
            <AiFillDownCircle size={24} color={color} />
          </span>
        )}
        <span className="ms-2">{data.compare ? Math.abs(data.compare).toFixed(2): 0 + ` (${getUnit(data.type)})`}</span>
      </div>
      <span>{"Last update: " + moment(data.createAt).format("h:mm:ss A, MMMM Do YYYY")}</span>
    </Col>
  );
}

function createData(title, temperature, soil, light) {
  return { title, temperature, soil, light };
}

const rows = [
  createData("Today", "31.6(°C)", "72.5 (%)", "1810 (LUX)"),
  createData("This week", "31.6(°C)", "72.5 (%)", "1810 (LUX)"),
  createData("This month", "31.6(°C)", "72.5 (%)", "1810 (LUX)"),
];
function Dashboard() {
  const {enviromentParams} = useSelector(state => ({...state.enviromentParams}))
  const dispatch = useDispatch()
  const socketRef = useRef();
  console.log("re-render")
  // get initial enviroment parameters
  useEffect(() => {
    dispatch(getEnviromentParams())
  }, [])

  useEffect(() => {
    // connect to host
    socketRef.current = socketIOClient.connect(host)

    // handle when received data from socket server
    socketRef.current.on("CollectTemperature", (data) => {
      dispatch(updateTemperature(data))
    }); 
    socketRef.current.on("CollectLight", (data) => {
      
     dispatch(updateLight(data))
    }); 
    socketRef.current.on("CollectHumidity", (data) => {
     dispatch(updateHumidity(data))
    }); 
    
    // disconnect to socket server
    return () => {
      socketRef.current.disconnect();
    }; 
  }, []);
  
  return (
    <>
      <Container className="p-4 d-flex flex-column w-100 gap-2 h-100">
        <StatusBar title="Dashboard" />
        <Row className="gap-3 mx-2 w-100">
          {enviromentParams.map((item, index) => (
            <DataBox key={index} data={item} />
          ))}
        </Row>
        <Row className="bg-white shadow mx-2 p-3 my-2 rounded w-100">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="m-0">Temperature and soil humidity history</h6>
            <div>
              <AiOutlineCalendar color="#E9652D" size={24} />
              <select className="border-0 btn btn">
                <option>Past 12 hours</option>
                <option>Past 24 hours</option>
                <option>Today</option>
                <option>The last 7 days</option>
                <option>Choose time</option>
              </select>
            </div>
          </div>
          <div className="d-flex">
            <div style={{ width: "70%" }}>
              <Chart type="bar" data={data} />
            </div>

            <div style={{ width: "30%" }} className="mt-5 p-4">
              <div className="form-group">
                <label htmlFor="fromdate" className="col-form-label">
                  From: *
                </label>
                <input
                  type="date"
                  placeholder="dd-mm-yyyy"
                  min={moment.utc(new Date()).format("YYYY-MM-DD")}
                  className="form-control"
                  id="fromdate"
                  required
                />
                <div className="invalid-feedback">Choose a date</div>
              </div>

              <div className="form-group">
                <label htmlFor="todate" className="col-form-label">
                  To *
                </label>
                <div className="d-flex align-items-center">
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    min={moment.utc(new Date()).format("YYYY-MM-DD")}
                    className="form-control"
                    id="todate"
                    required
                  />
                </div>
                <div className="invalid-feedback">Choose a date</div>
              </div>
            </div>
          </div>
        </Row>

        <TableContainer
          component={Paper}
          className="bg-white shadow mx-2 p-3 my-2 rounded w-100 border-0"
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ "td,th,tr": { border: 0 } }}>
              <TableRow>
                <TableCell align="left">Average</TableCell>
                <TableCell sx={{ color: "#e9652d" }} align="left">
                  Temperuture
                </TableCell>
                <TableCell sx={{ color: "#0e9cff" }} align="left">
                  Soil humidity
                </TableCell>
                <TableCell sx={{ color: "#ffd600" }} align="left">
                  Light
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} sx={{ "td,th,tr": { border: 0 } }}>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.temperature}</TableCell>
                  <TableCell align="left">{row.soil}</TableCell>
                  <TableCell align="left">{row.light}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <small className="mx-3 my-2 text-dark">
            <b>Last update:</b> 11:00 AM February 24, 2023
          </small>
        </TableContainer>
      </Container>
    </>
  );
}

export default Dashboard;
