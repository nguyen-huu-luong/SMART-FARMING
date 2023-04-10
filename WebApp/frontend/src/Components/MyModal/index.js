import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyModal({
  header = "Header",
  body = "This is body",
  closeTitle = "Close",
  confirmTitle = "Understood",
  closeBtn = false,
  confirmbtn = true,
  handleShow = () => {},
  handleConfirm = () => {},
  defaultShow = true,
  type = "primary"
}) {
  const [show, setShow] = useState(defaultShow);

  useEffect(() => {
    setShow(defaultShow)
  }, [defaultShow])
  const handleClose = () => {}; 
  // const handleShow = () => setShow(true);


  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          {closeBtn && (
            <Button variant="secondary" onClick={handleClose}>
              {closeTitle}
            </Button>
          )}
          {confirmbtn && <Button variant={type} onClick={() => handleConfirm()}>{confirmTitle}</Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;
