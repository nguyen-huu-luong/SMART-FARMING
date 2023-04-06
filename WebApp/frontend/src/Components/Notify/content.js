import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";

import { useDispatch} from "react-redux";
import { setView } from "../../redux/features/notifySlide";

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
            <Modal.Title>{item.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body><p>Action: {item.content}</p>
          <p>Time: {formatedDate}</p>
          </Modal.Body>

        </Modal>
      </>
    );
}

export default Content