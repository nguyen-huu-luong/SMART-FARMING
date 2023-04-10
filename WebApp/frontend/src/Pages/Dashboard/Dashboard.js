import moment from "moment";
import StatusBar from "../../Components/StatusBar";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
import { useDispatch, useSelector } from "react-redux";
import { getColor, getUnit } from "../../helper/helper";
import { Box, Tabs, Tab } from "@mui/material";
import { getAverageValues, getRecordsData } from "../../redux/features/recordSlice";

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

function DataBox({ data }) {
  if (data === {}) return <></>;
  let color = getColor(data.type);
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
        <span className="ms-2">
          {data.compare
            ? Math.abs(data.compare).toFixed(2)
            : 0 + ` (${getUnit(data.type)})`}
        </span>
      </div>
      <span>
        {"Last update: " +
          moment(data.createAt).format("h:mm:ss A, MMMM Do YYYY")}
      </span>
    </Col>
  );
}

// main compoent
function Dashboard() {
  const { enviromentParams, recordsData, averageValues } = useSelector((state) => ({
    ...state.records,
  }));
  const dispatch = useDispatch();
  const [time, setTime] = useState("today");
  let data = {
    labels: [],
    datasets: [
      {
        type: "line",
        label: "Temperature",
        borderColor: "rgb(233, 101, 45)",
        borderWidth: 2,
        data: [],
      },
      {
        type: "bar",
        label: "Soil humidity",
        backgroundColor: "rgb(14, 156, 255)",
        data: [],
        borderColor: "white",
        maxBarThickness: 30,
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    dispatch(getRecordsData(time));
  }, [time]); 

  useEffect(() => {
    dispatch(getAverageValues())
  }, [])

  useEffect(() => {
    let fromtime = document.forms["dashboard-chart-time"].fromtime
    let fromdate = document.forms["dashboard-chart-time"].fromdate
    let totime = document.forms["dashboard-chart-time"].totime
    let todate = document.forms["dashboard-chart-time"].todate 
    if (recordsData && time !== "chooseday") {
      fromtime.value = moment(recordsData.from).format("HH:mm")
      fromdate.value=moment(recordsData.from).format("YYYY-MM-DD")
      totime.value = moment(recordsData.to).format("HH:mm")
      todate.value=moment(recordsData.to).format("YYYY-MM-DD")
      fromtime.disabled = true
      fromdate.disabled = true
      totime.disabled = true
      todate.disabled = true
    } else if (time === "chooseday") {
      fromtime.disabled = false
      fromdate.disabled = false
      totime.disabled = false
      todate.disabled = false
    }
    
  }, [recordsData])

  const handleChangeChartTime = (e, newValue) => {
    setTime(newValue);
  };

  const handleSubmit = (e) => {
      e.preventDefault() ;
      let form = e.target
      let fromdate = form.fromdate.value
      let fromtime = form.fromtime.value
      let todate = form.todate.value
      let totime = form.totime.value
      let from = `${fromdate} ${fromtime}`
      let to = `${todate} ${totime}`
      dispatch(getRecordsData(`range?from=${from}&to=${to}`));
  }

  if (recordsData) {
    data.labels = recordsData.temperatureTime;
    data.datasets[0].data = recordsData.temperature;
    data.datasets[1].data = recordsData.humidity;

    if (recordsData.is_avg_value) {
      data.datasets[0].label = "Average Temperature";
      data.datasets[1].label = "Average Soil humidity";
    }
  }

  
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
              <Box sx={{ width: "100%" }}>
                <Tabs value={time} onChange={handleChangeChartTime}>
                  <Tab value="today" label="Today" />
                  <Tab value="yesterday" label="Yesterday" />
                  <Tab value="week" label="This week" />
                  <Tab value="month" label="This month" />
                  <Tab value="chooseday" label="Specific time" />
                </Tabs>
              </Box>
            </div>
          </div>
          <div className="d-flex">
            <div style={{ flex: 1 }}>
              <Chart className="w-100" type="bar" data={data} />
            </div>

            { 
              <form style={{ width: "30%" }} className="mt-5 p-4" id="dashboard-chart-time" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="fromdate" className="col-form-label">
                    From: *
                  </label>
                  <input
                    type="time"
                    dateTime="hh-mm"
                    className="form-control"
                    id="fromtime"
                    required
                  />

                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="form-control mt-1"
                    id="fromdate"
                    required
                  />
                  <div className="invalid-feedback">Choose a date</div>
                </div>

                <div className="form-group">
                  <label htmlFor="totime" className="col-form-label">
                    To *
                  </label>
                  <input
                    type="time"
                    datetime="hh:mm"
                    placeholder="dd-mm-yyyy"
                    className="form-control"
                    id="totime"
                    required
                  />

                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="form-control mt-1"
                    id="todate"
                    required
                  />
                  <div className="invalid-feedback">Choose a date</div>
                </div>
                {time === "chooseday" && (
                  <button className="btn btn-primary my-2" type="submit">
                    Confirm
                  </button>
                )}
              </form>
            }
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
              {
                Object.entries(averageValues).reduce((acc, [key, value]) => {
                  if (key !== "last_updated") 
                      acc.push(( 
                    <TableRow key = {acc.length} sx={{ "td,th,tr": { border: 0 } }}>
                      <TableCell align="left">{key}</TableCell>
                      <TableCell align="left">{value.temp}</TableCell>
                      <TableCell align="left">{value.humi}</TableCell>
                      <TableCell align="left">{value.light}</TableCell>
                    </TableRow>))
                   return acc ;
                }, [])
              }
            </TableBody>
          </Table>
          <small className="mx-3 my-2 text-dark">
            <b>Last update:</b>{' '}{moment(averageValues.last_updated).format('h:mm A, dddd, MMMM Do YYYY')}
          </small>
        </TableContainer>
      </Container>
    </>
  );
}

export default Dashboard;
