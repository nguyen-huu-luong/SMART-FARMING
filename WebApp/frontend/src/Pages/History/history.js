import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecsByTime } from "../../redux/features/allRecSlice";
import { MantineReactTable } from "mantine-react-table";
import StatusBar from "../../Components/StatusBar"

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
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => val(row.type), 
        header: "Data type",
        enableSorting: false,
      },
      {
        accessorKey: "value",
        header: "Value",
      },
      {
        accessorFn: (row) => device(row.dev_id),
        header: "Device name",
      },
      {
        accessorFn: (row) =>
          moment(row.createdAt).format("h:mm A, dddd, MMMM Do YYYY"),
        header: "Time",
        sortingFn: (rowA, rowB, columnId) => {
          return rowA.getValue(columnId).value < rowB.getValue(columnId).value
            ? 1
            : -1;
        },
      },
    ],
    []
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    let form = e.target;
    let fromdate = form.fromdate.value;
    let fromtime = form.fromtime.value;
    let todate = form.todate.value;
    let totime = form.totime.value;
    let from = `${fromdate} ${fromtime}`
    let to = `${todate} ${totime}`
    dispatch(getRecsByTime(`range?from=${from}&to=${to}`));
  };
  const dev = useSelector((state) => state.datas.timeRecords);

  useEffect(() => {
    dispatch(getRecsByTime(`range?from=${"1000-03-16 17:48"}&to=${"3000-03-16 17:48"}`));
  });
  return (
    <div className="container-fluid p-4 d-flex flex-column w-100 gap-2">
      <StatusBar title="View data history"/>
      <div
        className="row border border-gray-300 rounded bg-white mx-2 p-3 w-100 d-flex flex-sm-row flex-column"
        id="pick"
      >
        <form
          style={{ width: "30%" }}
          className="row d-flex flex-sm-row flex-column w-100 gap-2"
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
            <div className="col-md-3 col">
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
            <div className="col-md-3 col">
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                className="form-control"
                id="todate"
                required
              />
            </div>
            <button className="btn btn-primary col-md-auto mx-3 col" type="submit">
              Confirm
            </button>
        </form>
      </div>
      <div
        className="row border border-gray-300 rounded mx-2 bg-white p-3 flex-row w-100 justify-content-between align-items-center"
        id="device"
      >
        <div className="row d-flex flex-sm-row flex-column w-100 justify-content-between align-items-center mt-2 gap-1">
          <MantineReactTable
            columns={columns}
            data={dev}
            enableTopToolbar={false}
            mantinePaginationProps={{
              rowsPerPageOptions: ["5", "10"],
            }}
          />
          <div
            className="col d-flex flex-row w-100 justify-content-md-start justify-content-center align-items-center"
            id="bottom-left"
          >
            <p style={{ color: "#6C757D" }}>
              Hiển thị {dev.length} trong tổng dữ liệu
            </p>
          </div>
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
