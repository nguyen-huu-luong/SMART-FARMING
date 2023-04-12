import * as React from "react";
import logo from "../../Assets/SVG-image/logo.svg";
import { AiOutlineBell, AiOutlineLogout } from "react-icons/ai";
import MyPopper from "../MyPopper";
import { Fragment } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom"
import Notify from "../Notify";
import socketIOClient from 'socket.io-client';
import { useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotify, decrement, setCheck } from "../../redux/features/notifySlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

 
const host = "http://localhost:3003"

function Header() {
  const socketRef = useRef();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    socketRef.current = socketIOClient.connect(host)
    dispatch(getNotify(0)) 
    socketRef.current.on("receiveMess", (msg) => {
        dispatch(getNotify(0))  
        toast.warn(msg);
    })

  }, [])

  const dataAll = useSelector(state => state.notify)
  const data = dataAll.data
  let numNotify = dataAll.countAfter

  //navigate('/')
  const handelLogout = () => {
    sessionStorage.clear()
    navigate('/')
  }

  if(!sessionStorage.getItem('user')) {
    navigate('/404')
  } 
  
  return (
    <div
      className="w-100 position-fixed d-flex justify-content-between align-items-center px-5 bg-white py-1 shadow-sm"
      style={{ height: "var(--header-height)" }}
    >
      <img src={logo} />
      <ToastContainer limit={1} />
      <div className="d-flex align-items-center">
        <MyPopper
          toggle={
            <Fragment>
              <AiOutlineBell size={32} />{" "}
              {numNotify > 0 && (
                <span
                  className="position-absolute text-white"
                  style={{
                    right: 2,
                    top: -4,
                    backgroundColor: "red",
                    borderRadius: "50%",
                    width: 22,
                    height: 20,
                    fontSize: 14,
                  }}
                >
                  {numNotify > 100 ? 99 : numNotify}
                </span>
              )}
            </Fragment>
          }
        >
          {/* <div>Hiển thị danh sách thông báo ở đây</div> */}
          <div  style={{maxHeight: "310px", overflowY: "auto", overflowX: "hidden"}}>
          { 
            data.map((item) => {
              return (<Notify item={item} />)
            })
          }
          </div>

        </MyPopper>
        <Tooltip title="Logout" arrow>
          <button onClick={handelLogout} className="bg-white"> <IconButton color="default" className="bg-white text-dark">
            <AiOutlineLogout size={32} />
          </IconButton> </button> 
        </Tooltip>
      </div>
    </div>
  );
}

export default Header;
