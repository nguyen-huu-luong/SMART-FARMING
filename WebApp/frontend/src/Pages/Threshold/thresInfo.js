import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useEffect } from 'react';
const light = [
    { light: "(min, max)", status: "Normal", action: "None" },
    { light: "( __ ,min)", status: "Low light", action: "Turn on light" },
    { light: "(max, __)", status: "Hight light", action: "Turn off light" },

]

const pump = [
    { humi: "(min, max)", temp: "(min, max)", status: "Normal", action: "None" },
    { humi: "(min, max)", temp: "(__, min)", status: "Normal", action: "None" },
    { humi: "(min, max)", temp: "(max, __)", status: "Hight temperature", action: "Turn off the pump" },
    { humi: "(max, __)", temp: "(max, __)", status: "High temperature", action: "Turn off the pump" },
    { humi: "(max, __)", temp: "(max, __)", status: "High temperature", action: "Turn off the pump" },
    { humi: "(__, min)", temp: "(min, max)", status: "Low humidity", action: "Turn on the pump" },
    { humi: "(__, max)", temp: "(__, min)", status: "Low humidity", action: "Turn on the pump" },
    { humi: "(max, __)", temp: "(min, max)", status: "High humidity", action: "Turn off the pump" },
    { humi: "(max, __)", temp: "(__, min)", status: "High humidity", action: "Turn off the pump" }
]

const ThresInfo = () => {
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState("light")
    const [selected, setSelected] = useState('light');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleButton = (event) => {
        setInfo(event.target.value)
    }

    useEffect(() => {
        setSelected(info)
    }, [info])


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {<AiOutlineInfoCircle size={20} />} Information
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Information about threshold</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-around'>
                        <div class="form-check ">
                            <input class="form-check-input" type="radio" name="threshold" id="flexRadioDefault1" onChange={handleButton} value="light" checked={selected == "light"} />
                            <label class="form-check-label" for="flexRadioDefault1">
                                <span> </span>  Light
                            </label>
                        </div>
                        <div class="form-check ">
                            <input class="form-check-input" type="radio" name="threshold" id="flexRadioDefault2" onChange={handleButton} value="pump" checked={selected == "pump"} />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Humidity & Temperature
                            </label>
                        </div>
                    </div>
                    <div className='table-responsive mt-3' style={{ height: "180px" }}>

                        {
                            info == "light" ?
                                <table className="table table-bordered">
                                    <thead>
                                        <tr className='table-primary'>
                                            <th>Light</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            light.map(item => {
                                                return (
                                                    <tr >
                                                        <td>{item.light}</td>
                                                        <td>{item.status}</td>
                                                        <td>{item.action}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                : <table className="table table-bordered">
                                    <thead>
                                        <tr className='table-primary'>
                                            <th>Humidity</th>
                                            <th>Temperature</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            pump.map(item => {
                                                return (
                                                    <tr >
                                                        <td>{item.humi}</td>
                                                        <td>{item.temp}</td>
                                                        <td>{item.status}</td>
                                                        <td>{item.action}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                        }

                    </div>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default ThresInfo