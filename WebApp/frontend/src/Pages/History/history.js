import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecsByTime } from "../../redux/features/allRecSlice";
import { MantineReactTable } from "mantine-react-table";
import { Stack, Text, Center, Button, Group } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import StatusBar from "../../Components/StatusBar";
import { DataTable } from "mantine-datatable";
const device = (temp) => {
  switch (temp) {
    case "101":
      return "Temperature sensor";
    case "102":
      return "Humidity sensor";
    default:
      return "Light sensor";
  }
};
const val = (temp) => {
  switch (temp) {
    case "Temp":
      return "Temperature (°C)";
    case "Humi":
      return "Humidity (%)";
    default:
      return "Light (LUX)";
  }
};

const History = () => {
  const dispatch = useDispatch();
  const [initialDate, setInitialDate] = useState({
    fromDate: "1000-03-16 17:48",
    toDate: "3000-03-16 17:48",
  });
  const [dataType, setDataType] = useState("All");
  const handleSubmit = (e) => {
    e.preventDefault();
    let form = e.target;
    let fromdate = form.fromdate.value;
    let fromtime = form.fromtime.value;
    let todate = form.todate.value;
    let totime = form.totime.value;
    let typ = form.datatype.value;
    let from = `${fromdate} ${fromtime}`;
    let to = `${todate} ${totime}`;
    dispatch(
      getRecsByTime(`range?from=${from}&to=${to}&page=${1}&type=${typ}`)
    );
    setPage(1);
    setDataType(typ);
    setInitialDate({
      fromDate: from,
      toDate: to,
    });
  };
  const dev = useSelector((state) => state.datas.timeRecords);
  const totalHistory = Number(useSelector((state) => state.datas.totalPages));
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      getRecsByTime(
        `range?from=${initialDate.fromDate}&to=${initialDate.toDate}&page=${page}&type=${dataType}`
      )
    );
  }, [dispatch, page, initialDate, dataType]);
  return (
    <div className="container-fluid p-4 d-flex flex-column w-100 gap-2">
      <StatusBar title="View data history" />
      <div
        className="row border border-gray-300 rounded bg-white mx-2 p-3 w-100 d-flex flex-sm-row flex-column justi"
        id="pick"
      >
        <form
          style={{ width: "30%" }}
          className="row d-flex flex-sm-row flex-column w-100 gap-md-0 gap-2"
          id="dashboard-chart-time "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="col-md-2 col">
            <input
              type="time"
              dateTime="hh-mm"
              className="form-control"
              id="fromtime"
              required
            />
          </div>
          <div className="col-md-2 col">
            <input
              type="date"
              placeholder="dd-mm-yyyy"
              className="form-control"
              id="fromdate"
              required
            />
          </div>
          <div className="col-md-2 col">
            <input
              type="time"
              datetime="hh:mm"
              placeholder="dd-mm-yyyy"
              className="form-control"
              id="totime"
              required
            />
          </div>
          <div className="col-md-2 col">
            <input
              type="date"
              placeholder="dd-mm-yyyy"
              className="form-control"
              id="todate"
              required
            />
          </div>
          <div className="col-md-2 col">
            <select
              className="form-select "
              id="datatype"
              aria-label="dataType"
            >
              <option value="All">All</option>
              <option value="Humi">Humidity</option>
              <option value="Light">Light</option>
              <option value="Temp"> Temperature</option>
            </select>
          </div>
          <div className="col-md-2 col">
            <button className="btn btn-primary w-100" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>
      <div
        className="row border border-gray-300 rounded mx-2 bg-white p-3 flex-row w-100 justify-content-between align-items-center"
        id="device"
      >
        <div className="row d-flex flex-sm-row flex-column w-100 justify-content-between align-items-center mt-2 gap-1">
          <DataTable
            columns={[
              {
                accessor: "type",
                width: 100,
                title: "Data type",
                textAlignment: "left",
                render: ({ type }) => val(type),
              },
              {
                accessor: "value",
                width: 100,
                title: "Value",
                textAlignment: "center",
              },
              {
                accessor: "dev_id",
                width: 100,
                title: "Device name",
                textAlignment: "center",
                render: ({ dev_id }) => device(dev_id),
              },
              {
                accessor: "createAt",
                width: 100,
                title: "Time",
                textAlignment: "right",
                render: ({ createAt }) =>
                  moment(createAt).format("h:mm A, dddd, MMMM Do YYYY"),
              },
            ]}
            withBorder
            records={dev}
            recordsPerPage={10}
            totalRecords={totalHistory}
            page={page}
            idAccessor="_id"
            onPageChange={(p) => setPage(p)}
          />
          <div
            className="col d-flex flex-row w-100 justify-content-md-end justify-content-center align-items-center"
            id="bottom-right"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default History;
