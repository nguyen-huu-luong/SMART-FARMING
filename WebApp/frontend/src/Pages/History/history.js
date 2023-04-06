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
import ResponsivePagination from "react-responsive-pagination";
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
    const useract = useSelector((state) => state.data.useract)
    const dev = useSelector((state) => state.datas.datas)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllRecs())
        dispatch(getUserAct())
    }, [dispatch])
    const [itemOffset, SetOffset] = useState({ offset: 0, current: 0 })
    const itemPerPage = 6
    const endOffset = itemOffset.offset + itemPerPage
    const devs = dev.slice(itemOffset.offset, endOffset)
    const countPage = Math.ceil(dev.length / itemPerPage)
    const handelPagination = (event) => {
        const newOffset = ((event - 1) * itemPerPage) % dev.length  //event start from 1
        SetOffset({ offset: newOffset, current: (event) })
    }
    const [itemOffset1, SetOffset1] = useState({ offset: 0, current: 0 })
    const endOffset1 = itemOffset1.offset + itemPerPage
    const countPage1 = Math.ceil(useract.length / itemPerPage)
    const useracts = useract.slice(itemOffset1.offset, endOffset1)
    const handelPagination1 = (event) => {
        const newOffset = ((event - 1) * itemPerPage) % useract.length  //event start from 1
        SetOffset1({ offset: newOffset, current: (event) })
    }
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
                            {devs.map((item) => (
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
                        <p style={{ color: "#6C757D" }}>Hiển thị {devs.length} trong tổng {dev.length} dữ liệu</p>
                    </div>
                    <div className="col d-flex flex-row w-100 justify-content-md-end justify-content-center align-items-center" id="bottom-right">
                        <ResponsivePagination
                            current={itemOffset.current}
                            total={countPage}
                            onPageChange={handelPagination}
                        />
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
                            {useracts.map((item) => (
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
                        <p style={{ color: "#6C757D" }}>Hiển thị {useracts.length} trong tổng {useract.length} dữ liệu</p>
                    </div>
                    <div className="col d-flex flex-row w-100 justify-content-md-end justify-content-center align-items-center" id="bottom-right">
                        <ResponsivePagination
                            current={itemOffset1.current}
                            total={countPage1}
                            onPageChange={handelPagination1}
                            maxWidth={5}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History