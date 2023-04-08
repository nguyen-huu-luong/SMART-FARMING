import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecs } from "../../redux/features/allRecSlice";
import { getUserAct } from "../../redux/features/userActivitySlice";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
const device = (temp) => {
    switch (temp) {
        case "101":
            return "Temperature sensor"
        case "102":
            return "Humidity sensor"
        default:
            return "Light sensor"
    }
}
const val = (temp) => {
    switch (temp) {
        case "Temp":
            return "Temperature (°C)"
        case "Humi":
            return "Humidity (%)"
        default:
            return "Light (LUX)"
    }
}
const History = () => {
    const [status, setStatus] = useState(1)
    const radioHandler = (status) => {
        setStatus(status);
    };
    const time = new Date();
    //User activity pagination
    const [userPage, setUserPage] = useState(1)
    const useract = useSelector((state) => state.data.useract)
    const totalUseract = Number(useSelector((state) => state.data.totalPages))
    const countUserPage = Math.ceil(totalUseract / 6)
    const setPageUser = (e, p) => {
        setUserPage(p);
    }
    //Data history pagination
    const [historyPage, setHistoryPage] = useState(1)
    const dev = useSelector((state) => state.datas.datas)
    const totalHistory = Number(useSelector((state) => state.datas.totalPages))
    const countHistoryPage = Math.ceil(totalHistory / 6)
    const setPage = (e, p) => {
        setHistoryPage(p);
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllRecs(historyPage))
        dispatch(getUserAct(userPage))
    }, [userPage, historyPage])
    return (
        <div className="container-fluid p-4 d-flex flex-column w-100 gap-2">
            <div className="row border border-gray-300 rounded bg-white p-3 mx-2 flex-row w-100 justify-content-between align-items-center" id="top-nav">
                <h6 className="col m-0">
                    View History
                </h6>
                <h6 className="col m-0 text-end">
                    {moment(time).format('h:mm A, dddd, MMMM Do YYYY')}
                </h6>
            </div>
            <div className="row border border-gray-300 rounded bg-white p-3 mx-2 flex-row w-100 justify-content-between align-items-center" id="pick">
                <div className="col-5 form-check d-flex justify-content-end gap-2">
                    <input className="form-check-input" type="radio" name="choose" id="def" defaultChecked={status === 1} onClick={(e) => radioHandler(1)} />
                    <label className="form-check-label" htmlFor="def">
                        View device's activity
                    </label>
                </div>
                <div className="col-5 form-check d-flex justify-content-start gap-2">
                    <input className="form-check-input" type="radio" name="choose" id="cus" defaultChecked={status === 2} onClick={(e) => radioHandler(2)} />
                    <label className="form-check-label" htmlFor="cus">
                        View user's activity
                    </label>
                </div>
            </div>
            <div className="row border border-gray-300 rounded bg-white p-3 mx-2 flex-row w-100 justify-content-between align-items-center" id="device"
                style={{ display: status === 1 ? 'block' : 'none' }}>
                <TableContainer component={Paper}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Data</TableCell>
                                <TableCell align="right">Value</TableCell>
                                <TableCell align="right">Device name</TableCell>
                                <TableCell align="right">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dev.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{val(item.type)}</TableCell>
                                    <TableCell align="right">{item.value}</TableCell>
                                    <TableCell align="right">{device(item.dev_id)}</TableCell>
                                    <TableCell align="right">{moment.utc(item.createAt).format('h:mm A, dddd, MMMM Do YYYY')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="row d-flex flex-sm-row flex-column w-100 justify-content-between align-items-center mt-2  gap-1">
                    <div className="col d-flex flex-row w-100 justify-content-md-start justify-content-center align-items-center" id="bottom-left">
                        <p style={{ color: "#6C757D" }}>Hiển thị {dev.length} trong tổng {totalHistory} dữ liệu</p>
                    </div>
                    <div className="col d-flex flex-row w-100 justify-content-md-end justify-content-center align-items-center" id="bottom-right">
                        {/* <ResponsivePagination
                            current={itemOffset.current}
                            total={countPage}
                            onPageChange={handelPagination}
                        /> */}
                        <Pagination count={countHistoryPage} page={historyPage} onChange={setPage} showFirstButton showLastButton/>
                    </div>
                </div>
            </div>
            <div className="row border border-gray-300 rounded bg-white p-3 mx-2 flex-row w-100 justify-content-between align-items-center" id="device"
                style={{ display: status === 2 ? 'block' : 'none' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Action</TableCell>
                                <TableCell align="right">Actor</TableCell>
                                <TableCell align="right">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {useract.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{item.action}</TableCell>
                                    <TableCell align="right">{item.actor}</TableCell>
                                    <TableCell align="right">{ moment(item.createdAt).format('h:mm A, dddd, MMMM Do YYYY')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="row d-flex flex-sm-row flex-column w-100 justify-content-between align-items-center mt-2  gap-1">
                    <div className="col d-flex flex-row w-100 justify-content-md-start justify-content-center align-items-center" id="bottom-left">
                        <p style={{ color: "#6C757D" }}>Hiển thị {useract.length} trong tổng {totalUseract} dữ liệu</p>
                    </div>
                    <div className="col d-flex flex-row w-100 justify-content-md-end justify-content-center align-items-center" id="bottom-right">
                        {/* <ResponsivePagination
                            current={itemOffset1.current}
                            total={countPage1}
                            onPageChange={handelPagination1}
                            maxWidth={5}
                        /> */}
                        <Pagination count={countUserPage} page={userPage} onChange={setPageUser} showFirstButton showLastButton/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History