import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAct } from "../../redux/features/userActivitySlice";
import { Stack, Text, Center, Button, Group } from "@mantine/core";
import StatusBar from "../../Components/StatusBar";
import { DataTable } from "mantine-datatable";

const History = () => {
  const dispatch = useDispatch();
  const [initialDate, setInitialDate] = useState({
    fromDate: "1000-03-16 17:48",
    toDate: "3000-03-16 17:48",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    let form = e.target;
    let fromdate = form.fromdate.value;
    let fromtime = form.fromtime.value;
    let todate = form.todate.value;
    let totime = form.totime.value;
    let from = `${fromdate} ${fromtime}`;
    let to = `${todate} ${totime}`;
    dispatch(
      getUserAct(`range?from=${from}&to=${to}&page=${1}`)
    );
    setPage(1);
    setInitialDate({
      fromDate: from,
      toDate: to,
    });
  };
  const useract = useSelector((state) => state.data.useract);
  const totalHistory = Number(useSelector((state) => state.data.totalPages));
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      getUserAct(
        `range?from=${initialDate.fromDate}&to=${initialDate.toDate}&page=${page}`
      )
    );
  }, [dispatch, page, initialDate]);
  return (
    <div className="container-fluid p-4 d-flex flex-column w-100 gap-2">
      <StatusBar title="View user history" />
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
              dateTime="hh:mm"
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
                accessor: "action",
                width: 100,
                title: "Action",
                textAlignment: "left",
              },
              {
                accessor: "actor",
                width: 100,
                title: "Actor",
                textAlignment: "center",
              },
              {
                accessor: "createdAt",
                width: 100,
                title: "Time",
                textAlignment: "right",
                render: ({ createdAt }) =>
                  moment(createdAt).format("h:mm A, dddd, MMMM Do YYYY"),
              },
            ]}
            withBorder
            records={useract}
            recordsPerPage={8}
            totalRecords={totalHistory}
            page={page}
            idAccessor="_id"
            onPageChange={(p) => setPage(p)}
            // rowExpansion={{
            //   collapseProps: {
            //     transitionDuration: 500,
            //     animateOpacity: false,
            //     transitionTimingFunction: "ease-out",
            //   },
            //   allowMultiple: true,
            //   content: ({ record }) => (
            //     <Stack p="xs" spacing={6}>
            //       <Group spacing={6}>
            //         <Text>Detail: </Text>
            //         <Text>Nhập nội dung chi tiết</Text>
            //       </Group>
            //     </Stack>
            //   ),
            // }}
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
