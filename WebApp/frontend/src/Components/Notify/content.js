import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";

import { useDispatch} from "react-redux";
import { setView } from "../../redux/features/notifySlice";
import {AiFillWarning} from "react-icons/ai"

const Content = ({item}) => {
  
    let dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const handleClose = () => {
      dispatch(setView({id: item._id}))
      setShow(false)
    
    };
    const handleShow = () => setShow(true);
    let date = new Date()
    const timestamp = Date.now(); // This would be the timestamp you want to format

    const formatedDate = new Date(item.createdAt).toLocaleString();
    return (
      <>
        <Button className='p-0' style={{backgroundColor: "white", color: "blue", fontSize: "10px", border:"none"} } onClick={handleShow}>
          View full notification
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><span className='text-warning d-inline-block '><AiFillWarning size={40}/> </span> {item.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{
            item.type == 0 ?
           <>
           <p>Threshold time: {formatedDate}</p>
           <p>Current value of light: {item.current1}</p>
           <p>Light status: {item.buttonStatus}</p>
           <p>Action advice: {item.content}</p>
          </> 
          :    <>
          <p>Threshold time: {formatedDate}</p>
          <p>Current value of Humidity: {item.current1}</p>
           <p>Current value of Temperature: {item.current2}</p>
           <p>Pump status: {item.buttonStatus}</p>
           <p>Action advice: {item.content}</p>
          </> 
          }
          </Modal.Body>

        </Modal>
      </>
    );
}

export default Content