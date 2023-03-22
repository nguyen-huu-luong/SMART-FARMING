import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecs } from "../../redux/features/allRecSlice";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import socketIOClient from "socket.io-client";
const host = "http://localhost:3003";
const device = (temp) => {
    switch(temp){
        case "101":
            return "Temperature sensor"
            break;
        case "102":
            return "Humidity sensor"
            break;
        default:
            return "Light sensor"
    }
}
const temp = [{action: "Turn on the light", actor: "User", time: "10:56 PM, Wednesday, March 22nd 2023"}, 
            {action: "Turn on the light", actor: "User", time: "10:56 PM, Wednesday, March 22nd 2023"},
            {action: "Turn on the light", actor: "User", time: "10:56 PM, Wednesday, March 22nd 2023"},
            {action: "Turn on the light", actor: "User", time: "10:56 PM, Wednesday, March 22nd 2023"},
            {action: "Turn on the light", actor: "User", time: "10:56 PM, Wednesday, March 22nd 2023"},
            {action: "Turn on the light", actor: "User", time: "10:56 PM, Wednesday, March 22nd 2023"},
            {action: "Turn on the light", actor: "User", time: "10:56 PM, Wednesday, March 22nd 2023"}]
const History = () => {
    const [status, setStatus] = useState(1)
    const radioHandler = (status) => {
        setStatus(status);
    };
    const dat = useSelector((state) => state.datas.datas)
    const socketRef = useRef();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllRecs())
    }, [])
    useEffect(() => {
        // connect to host
        socketRef.current = socketIOClient.connect(host)

        // handle when received data from socket server
        socketRef.current.on("CollectTemperature", (data) => {
            dispatch(getAllRecs())
        });
        socketRef.current.on("CollectLight", (data) => {

            dispatch(getAllRecs())
        });
        socketRef.current.on("CollectHumidity", (data) => {
            dispatch(getAllRecs())
        });

        // disconnect to socket server
        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    const time = new Date();
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
                    <Table sx={{ minWidth: 650 } } aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Data</TableCell>
                                <TableCell align="right">Value</TableCell>
                                <TableCell align="right">Device id</TableCell>
                                <TableCell align="right">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dat.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{item.type}</TableCell>
                                    <TableCell align="right">{item.value}</TableCell>
                                    <TableCell align="right">{device(item.dev_id)}</TableCell>
                                    <TableCell align="right">{moment.utc(item.createAt).format('h:mm A, dddd, MMMM Do YYYY')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
                            {temp.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{item.action}</TableCell>
                                    <TableCell align="right">{item.actor}</TableCell>
                                    <TableCell align="right">{item.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default History