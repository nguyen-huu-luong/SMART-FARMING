import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";

import Spin from "../../Components/Spin/spin";
import CustomizedSwitches from "../../Components/IOSSwitch";
import {
  getAllDevices,
  updateDeviceStatus,
} from "../../redux/features/deviceSlice";
import StatusBar from "../../Components/StatusBar";
import { getColor } from "../../helper/helper";
import { getUnit } from "../../helper/helper";
import lighton from "../../Assets/Image/pic_bulbon.gif";
import lightoff from "../../Assets/Image/pic_bulboff.gif";
import MyModal from "../../Components/MyModal";
import CountDown from "../../Components/CountDown";

const host = "http://localhost:3003";

function Devices() {
  const [waiting, setWaiting] = useState({
    btn: "",
    isWaiting: false,
    error: "",
  });
  const socketRef = useRef();
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);
  const data = devices.devices;
  console.log("re-render", waiting);

  const handleToggle = (publish_btn, isCheck) => {
    socketRef.current.emit("toggleButton", {
      publish_btn,
      value: isCheck ? 1 : 0,
    });
    setWaiting((state) => {
      return { ...state, btn: publish_btn, isWaiting: true };
    });
  };

  useEffect(() => {
    let timerId;
    if (waiting.btn && waiting.isWaiting) {
      timerId = setTimeout(() => {
        if (waiting.btn && waiting.isWaiting) {
          setWaiting({
            btn: "",
            isWaiting: false,
            error: "No response from the server, please try again",
          });
        }
      }, 10000);
    }

    return () => clearTimeout(timerId);
  }, [waiting]);

  useEffect(() => {
    dispatch(getAllDevices());
  }, [dispatch]);
  useEffect(() => {
    // connect to host
    socketRef.current = socketIOClient.connect(host);
    socketRef.current.on("waitingAck", (message) => {
      setWaiting((state) => {
        return { ...state, btn: message.publish_btn, isWaiting: true };
      });
    });
    socketRef.current.on("receiveACk", (message) => {
      if (waiting.isWaiting) {
        setWaiting((state) => ({ ...state, btn: "", isWaiting: false }));
        dispatch(
          updateDeviceStatus({
            publish_btn: message.publish_btn,
            value: message.value,
          })
        );
      }
    });

    // disconnect to socket server
    return () => {
      socketRef.current.disconnect();
    };
  }, [waiting, dispatch]);
  return (
    <>
      <Container className="p-4 d-flex flex-column w-100 h-100 align-items-center">
        <StatusBar title="IoT dashboard" />
        <Row className="g-0 w-100 mt-3 mb-1">
          {data
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
                        src={require("../../Assets/Image/sensor.png")}
                        alt="sensor"
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

        <Row className="g-0 w-100 align-items-start">
          {data
            .filter((item) => item.type === "output")
            .map((item, index) => (
              <Col
                md={4}
                key={index}
                className={(index % 3 === 1 ? "px-3" : "") + " py-2"}
              >
                <div className="p-3 bg-white shadow rounded">
                  <div className="d-flex">
                    {item.name == "Light" ? (
                      <img
                        src={item.status === 1 ? lighton : lightoff}
                        alt="light"
                        style={{ height: 120 }}
                      />
                    ) : (
                      <img
                        src={require("../../Assets/Image/pump.jpg")}
                        alt="pump"
                        style={{ height: 120 }}
                      />
                    )}
                    <div className="ps-4">
                      <b>{item.name}</b>
                      <p className="my-2">
                        Status:{" "}
                        <b className="color-primary">
                          {item.status === 1 ? "ON" : "OFF"}
                        </b>
                      </p>
                      <CustomizedSwitches
                        disabled={waiting.isWaiting}
                        status={item.status}
                        handleToggle={(isCheck) =>
                          handleToggle(item.publish_btn, isCheck)
                        }
                      />
                      {waiting.isWaiting &&
                        waiting.btn === item.publish_btn && (
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
                    {item.time ? (
                      <>
                        <p className="my-2">Remainding time: </p>
                        <CountDown
                          targetDate={new Date(item.time)}
                          handleTimeOut={() => {
                            dispatch(getAllDevices());
                          }}
                        />
                        <Link to={item.name === "Light" ? "/lightplan" : "/waterplan"} className="btn text-success">
                          <b>Change</b>
                        </Link>
                      </>
                    ) : (
                      <>
                        <p className="my-0">Not scheduled</p>
                        <Link to={item.name === "Light" ? "/lightplan" : "/waterplan"} className="btn text-success">
                          <b>+ New</b>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>

      {waiting.error !== "" && (
        <MyModal
          header="Something went wrong!"
          body={waiting.error}
          handleConfirm={() => setWaiting((state) => ({ ...state, error: "" }))}
          confirmTitle="Close"
          type="danger"
          defaultShow={true}
        />
      )}
    </>
  );
}

export default Devices;
