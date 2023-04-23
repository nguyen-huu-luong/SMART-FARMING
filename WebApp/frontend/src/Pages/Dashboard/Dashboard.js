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
import {
  getAverageValues,
  getRecordsData,
} from "../../redux/features/recordSlice";
import { useViewport } from "../../hooks";

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

function DataBox({ data, last_item = false }) {
  const viewport = useViewport()
  if (data === {}) return <></>;
  let color = getColor(data.type);
  return (
    <Col
      md={4}
      sm = {12}
      xs ={12}
    >
      <div className={`${last_item || viewport.width <= 768 ? ' ' : 'me-3'} bg-white shadow p-3 my-2`}  style={{ borderBottom: `6px solid ${color}`, borderRadius: 8 }}>
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
      </div>
    </Col>
  );
}

// main compoent
function Dashboard() {
  const { enviromentParams, recordsData, averageValues } = useSelector(
    (state) => ({
      ...state.records,
    })
  );
  const viewport = useViewport();
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
        borderWidth: 1,
      },
    ],
  };
  console.log("re-render")

  useEffect(() => {
    dispatch(getRecordsData(time));
  }, [time]);

  useEffect(() => {
    dispatch(getAverageValues());
  }, []);

  useEffect(() => {
    if (document.forms["dashboard-chart-time"]) {
      let fromtime = document.forms["dashboard-chart-time"].fromtime;
      let fromdate = document.forms["dashboard-chart-time"].fromdate;
      let totime = document.forms["dashboard-chart-time"].totime;
      let todate = document.forms["dashboard-chart-time"].todate;
      if (recordsData && time !== "chooseday") {
        if (fromtime) {
          fromtime.value = moment(recordsData.from).format("HH:mm");
          fromtime.disabled = true;
        }
        if (fromdate) {
          fromdate.value = moment(recordsData.from).format("YYYY-MM-DD");
          fromdate.disabled = true;
        }
        if (totime) {
          totime.value = moment(recordsData.to).format("HH:mm");
          totime.disabled = true;
        }
        if (todate) {
          todate.value = moment(recordsData.to).format("YYYY-MM-DD");
          todate.disabled = true;
        }
      } else if (time === "chooseday") {
        fromtime.disabled = false;
        fromdate.disabled = false;
        totime.disabled = false;
        todate.disabled = false;
      }
    }
  }, [recordsData]);

  const handleChangeChartTime = (e, newValue) => {
    setTime(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = e.target;
    let fromdate = form.fromdate.value;
    let fromtime = form.fromtime.value;
    let todate = form.todate.value;
    let totime = form.totime.value;
    let from = `${fromdate} ${fromtime}`;
    let to = `${todate} ${totime}`;
    dispatch(getRecordsData(`range?from=${from}&to=${to}`));
  };

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
      <Container
        className="py-2 px-0 p-md-4 d-flex flex-column w-100 gap-2 h-100"
        style={{ maxWidth: "100%" }}
      >
        <StatusBar title="Dashboard" />
        <Row className="gx-0  mx-2 w-100 justify-content-between">
          {enviromentParams.map((item, index) => (
            <DataBox key={index} data={item} last_item = {index === enviromentParams.length - 1}/>
          ))}
        </Row>
        <Row className="bg-white shadow mx-2 p-1 p-md-3 my-2 rounded w-100">
          <Col
            sm={12}
            className={`d-flex ${
              viewport.size.includes("sm") ? "flex-column-reverse" : ""
            } align-items-center justify-content-between`}
          >
            <h6 className="my-2">Temperature and soil humidity history</h6>
            <Box sx={{ maxWidth: { xs: 320, sm: 480, md: '100%' } }}>
              <Tabs
                value={time}
                onChange={handleChangeChartTime}
                // TabIndicatorProps={{ sx: { display: "none" } }}
                variant={
                  viewport.size.includes("sm") ? "scrollable" : "standard"
                }
                scrollButtons={viewport.size.includes('sm') ? "auto": "auto"}
              >
                <Tab value="today" label="Today" />
                <Tab value="yesterday" label="Yesterday" />
                <Tab value="week" label="This week" />
                <Tab value="month" label="This month" />
                <Tab value="chooseday" label="Specific time" />
              </Tabs>
            </Box>

            {/* Menu time in mobile */}
            {/*  */}
          </Col>
          <Col sm={12} xs ={12} className={`${viewport.width <= 768 && "flex-column-reverse"} d-flex row`}>
            <div className="col-12 col-md-9 col-sm-12 col-xs-12" style={{minHeight: 250 }}>
              <Chart
                // className="w-100 h-100"
                type="bar"
                data={data}
                options={{ responsive: true,maintainAspectRatio: false, aspectRatio: 2}}
              />
            </div>

            {!(viewport.width <= 576 && time !== "chooseday") && (
              <form
                className="p-1 mt-1 p-md-4 mt-md-5 col-12 col-md-3 col-sm-12 col-xs-12"
                id="dashboard-chart-time"
                onSubmit={(e) => handleSubmit(e)}
              >
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
            )}
          </Col>
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
              {Object.entries(averageValues).reduce((acc, [key, value]) => {
                if (key !== "last_updated")
                  acc.push(
                    <TableRow
                      key={acc.length}
                      sx={{ "td,th,tr": { border: 0 } }}
                    >
                      <TableCell align="left">{key}</TableCell>
                      <TableCell align="left">{value.temp}</TableCell>
                      <TableCell align="left">{value.humi}</TableCell>
                      <TableCell align="left">{value.light}</TableCell>
                    </TableRow>
                  );
                return acc;
              }, [])}
            </TableBody>
          </Table>
          <small className="mx-3 my-2 text-dark">
            <b>Last update:</b>{" "}
            {moment(averageValues.last_updated).format(
              "h:mm A, dddd, MMMM Do YYYY"
            )}
          </small>
        </TableContainer>
      </Container>
    </>
  );
}

export default Dashboard;
