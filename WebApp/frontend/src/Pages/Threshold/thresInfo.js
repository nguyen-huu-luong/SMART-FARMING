import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineInfoCircle } from "react-icons/ai";

const light = [
  {light: "(min, max)", status: "Normal", action: "None"},
  {light: "( __ ,min)", status: "Low light", action: "Turn on light"},
  {light: "(max, __)", status: "Hight light", action: "Turn off light"},

]

const pump = [
  {humi: "(min, max)", temp: "(min, max)" , status: "Normal", action: "None"},
  {humi: "(min, max)", temp: "(__, min)" , status: "Normal", action: "None"},
  {humi: "(min, max)", temp: "(max, __)" , status: "Hight temperature", action: "None"},
  {humi: "(min, max)", temp: "(min, max)" , status: "Normal", action: "None"},
  {humi: "(min, max)", temp: "(min, max)" , status: "Normal", action: "None"},
  {humi: "(min, max)", temp: "(min, max)" , status: "Normal", action: "None"},
  {humi: "(min, max)", temp: "(min, max)" , status: "Normal", action: "None"},
  {humi: "(min, max)", temp: "(min, max)" , status: "Normal", action: "None"},
]

const ThresInfo = () => {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("light")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleButton = (event) =>{
        console.log(event.target.value)
  }

  console.log(info)

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
              <input class="form-check-input" type="radio" name="threshold" id="flexRadioDefault1" onChange={handleButton} value="light" />
              <label class="form-check-label" for="flexRadioDefault1">
              <span> </span>  Light
              </label>
            </div>
            <div class="form-check ">
              <input class="form-check-input" type="radio" name="threshold" id="flexRadioDefault2" onChange={handleButton} value="pump" />
              <label class="form-check-label" for="flexRadioDefault2">
              Humidity & Temperature

              </label>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  )
}

export default ThresInfo