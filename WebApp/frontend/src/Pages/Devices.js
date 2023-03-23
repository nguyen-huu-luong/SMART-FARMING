import { Col, Container, Row } from "react-bootstrap";
import StatusBar from "../Components/StatusBar";
import { useSelector } from "react-redux";
import { getColor } from "../helper/helper";
import { getUnit } from "../helper/helper";
import lighton from "../Assets/Image/pic_bulbon.gif";
import lightoff from "../Assets/Image/pic_bulboff.gif";
import CustomizedSwitches from "../Components/IOSSwitch";
import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
const inputDevices = [
  {
    id: 2134,
    type: "Temp",
    name: "Temperature sensor",
    status: 1,
    currentValue: 34,
  },
  {
    id: 23131,
    name: "Light sensor",
    type: "Light",
    status: 1,
    currentValue: 34,
  },
  {
    id: 42123,
    type: "Humi",
    name: "Soil humidity sensor",
    status: 1,
    currentValue: 34,
  },
];
function Devices() {
  const [light, setLight] = useState(false);
  const [pump, setPump] = useState(false);
  const [time, setTime] = useState(10000)
  console.log('re-render')
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time => time - 1000)
    } , 1000) 

    return () => clearTimeout(timer)
  }, [time])
  const { enviromentParams } = useSelector((state) => ({
    ...state.enviromentParams,
  }));
  return (
    <Container className="p-4 d-flex flex-column w-100 h-100 align-items-center">
      <StatusBar title="IoT dashboard" />
      <Row className="g-0 w-100 my-3">
        {inputDevices.map((item, index) => (
          <Col
            md={4}
            key={index}
            className={
              index > 0 && index < inputDevices.length - 1
                ? "px-3 py-2"
                : "py-2"
            }
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
                style={{ transform: "scale(80%)" }}
              />
              <div className="ps-2">
                <b>{`${item.name}`}</b>
                <p className="my-2">
                  Current value:{" "}
                  <span style={{ color: getColor(item.type) }}>
                    {index < 2 &&
                      enviromentParams[index].value +
                        ` (${getUnit(item.type)})`}
                  </span>
                </p>
                <p>
                  Status:{" "}
                  <b className="color-primary">
                    {item.status == 1 ? "Active" : "Disconected"}
                  </b>
                </p>
              </div>
            </div>
          </Col>
        ))}
        <Col md={4} className="py-2">
          <div className="p-3 bg-white shadow rounded">
            <div className="d-flex">
              <img src={light ? lighton : lightoff} />
              <div className="ps-4">
                <b>Light 1</b>
                <p className="my-2">
                Status: <b className="color-primary">{light ? "ON" : 'OFF'}</b>
                </p>
                <CustomizedSwitches
                  handleToggle={(isCheck) => setLight(isCheck)}
                />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p className="my-2">Remainfing time: </p>
              <span>{moment(time).format("h : mm : ss")}</span>
              <Link to = '/lightplan' className="btn text-success"><b>Change</b></Link>
            </div>
          </div>
        </Col>

        <Col md={4} className="py-2 ps-3">
          <div className="p-3 bg-white shadow rounded">
            <div className="d-flex">
              <img width={"50%"} src={require('../Assets/Image/pump.jpg')} />
              <div className="ps-4">
                <b>Pump</b>
                <p className="my-2">
                  Status: <b className="color-primary">{pump ? "ON" : 'OFF'}</b>
                </p>
                <CustomizedSwitches
                  handleToggle={(isCheck) => setPump(isCheck)}
                />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p className="my-2">Remainfing time: </p>
              <span>{moment(time).format("h : mm : ss")}</span>
              <Link to = '/waterplan' className="btn text-success"><b>Change</b></Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Devices;
