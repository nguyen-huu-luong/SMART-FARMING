import { Col, Container, Row } from "react-bootstrap";
import StatusBar from "../Components/StatusBar";
import { useDispatch, useSelector } from "react-redux";
import { getColor } from "../helper/helper";
import { getUnit } from "../helper/helper";
import lighton from "../Assets/Image/pic_bulbon.gif";
import lightoff from "../Assets/Image/pic_bulboff.gif";
import CustomizedSwitches from "../Components/IOSSwitch";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Spin from "../Components/Spin/spin";
import {
  getAllDevices,
  updateDeviceStatus,
} from "../redux/features/deviceSlice";

const host = "http://localhost:3003";
function Devices() {
  const [waiting, setWaiting] = useState({ btn: "", value: false });
  const [time, setTime] = useState(100);
  const socketRef = useRef();
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.devices);
  // console.log("re-render");
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTime((time) => time - 1000);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [time]);
  const handleToggle = (publish_btn, isCheck) => {
    socketRef.current.emit("toggleButton", { publish_btn, value: isCheck ? 1 : 0 });
    setWaiting({ btn: publish_btn, value: true });
  };

  useEffect(() => {
    dispatch(getAllDevices());
  }, [dispatch]);
  useEffect(() => {
    // connect to host
    socketRef.current = socketIOClient.connect(host);

    socketRef.current.on("receiveACk", (message) => {
      if (waiting.value) {
        setWaiting((state) => ({ ...state, value: false }));
        dispatch(updateDeviceStatus({ publish_btn: message.publish_btn, value: message.value }));
      }
    });

    // disconnect to socket server
    return () => {
      socketRef.current.disconnect();
    };
  }, [waiting,dispatch]);
  return (
    <Container className="p-4 d-flex flex-column w-100 h-100 align-items-center">
      <StatusBar title="IoT dashboard" />
      <Row className="g-0 w-100 mt-3 mb-2">
        {devices
          .filter((item) => item.type === "input")
          .map(
            (item, index) =>
              item.type === "input" && (
                <Col
                  md={4}
                  key={index}
                  className={index % 3 === 1 ? "px-3 py-2" : "py-2"}
                >
                  <div
                    className="bg-white shadow d-flex align-items-center rounded"
                    style={{
                      borderBottom: `3px solid ${getColor(item.type)}`,
                      borderRadius: 8,
                    }}
                  >
                    <img
                      src={require("../Assets/Image/sensor.png")}
                      alt = "sensor"
                      style={{ transform: "scale(80%)" }}
                    />
                    <div className="ps-2">
                      <b>{`${item.name}`}</b>
                      <p className="my-2">
                        Current value:{" "}
                        <span
                          style={{ color: getColor(item.name.toLowerCase()) }}
                        >
                          {item.nearest_value +
                            ` (${getUnit(item.name.toLowerCase())})`}
                        </span>
                      </p>
                      <p>
                        Status:{" "}
                        <b className="color-primary">
                          {item.status === 1 ? "Active" : "Disconected"}
                        </b>
                      </p>
                    </div>
                  </div>
                </Col>
              )
          )}
      </Row>

      <Row className="g-0 w-100">
        {devices
          .filter((item) => item.type === "output")
          .map((item, index) =>
            item.name === "Light" ? (
              <Col
                md={4}
                key={index}
                className={(index % 3 === 1 ? "px-3" : "") + " py-2"}
              >
                <div className="p-3 bg-white shadow rounded">
                  <div className="d-flex">
                    <img src={item.status === 1 ? lighton : lightoff}  alt="light"/>
                    <div className="ps-4">
                      <b>Light 1</b>
                      <p className="my-2">
                        Status:{" "}
                        <b className="color-primary">
                          {item.status === 1 ? "ON" : "OFF"}
                        </b>
                      </p>
                      <CustomizedSwitches
                        disabled={waiting.value}
                        handleToggle={(isCheck) =>
                          handleToggle(item.publish_btn, isCheck)
                        }
                      />
                      {waiting.value && waiting.btn === item.publish_btn && (
                        <div className="d-flex align-items-center">
                          <p className="color-primary my-0 me-2">
                            {item.status === 0 ? "Turning on" : "Turning off"}
                          </p>
                          <Spin />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="my-2">Remainfing time: </p>
                    <span>{moment(time).format("h : mm : ss")}</span>
                    <Link to="/lightplan" className="btn text-success">
                      <b>Change</b>
                    </Link>
                  </div>
                </div>
              </Col>
            ) : (
              <Col
                md={4}
                key={index}
                className={(index % 3 === 1 ? "px-3" : "") + " py-2"}
              >
                <div className="p-3 bg-white shadow rounded">
                  <div className="d-flex">
                    <img
                      width={"50%"}
                      src={require("../Assets/Image/pump.jpg")}
                      alt="pump"
                    />
                    <div className="ps-4">
                      <b>Pump</b>
                      <p className="my-2">
                        Status:{" "}
                        <b className="color-primary">
                          {item.status === 1 ? "ON" : "OFF"}
                        </b>
                      </p>
                      <CustomizedSwitches
                        disabled={waiting.value}
                        handleToggle={(isCheck) =>
                          handleToggle(item.publish_btn, isCheck)
                        }
                      />
                      {waiting.value && waiting.btn === item.publish_btn && (
                        <div className="d-flex align-items-center">
                          <p className="color-primary my-0 me-2">
                            {item.status === 0 ? "Turning on" : "Turning off"}
                          </p>
                          <Spin />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="my-2">Remainfing time: </p>
                    <span>{moment(1).format("h : mm : ss")}</span>
                    <Link to="/waterplan" className="btn text-success">
                      <b>Change</b>
                    </Link>
                  </div>
                </div>
              </Col>
            )
          )}
      </Row>
    </Container>
  );
}

export default Devices;
