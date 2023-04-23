import StatusBar from "../../Components/StatusBar"
import ThresItem from "./thresItem"
import Humidity from "../../Assets/Image/humidity.png"
import Temp from "../../Assets/Image/temp.png"
import Light from "../../Assets/Image/light.png"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { getThreshold, updateThreshold } from "../../redux/features/thresholdSlice"
import ThresInfo from "./thresInfo"
import { useViewport } from "../../hooks"

const Threshold = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (dataValue.userID == 0) {
            console.log("Haha")
            dispatch(getThreshold(0))
        }
    }, [])

    const dataValue = useSelector((state) => state.threshold)

    const value = useRef([])
    const handleClose = () => setShow(false);
    const handelSubmit = () => {
        let data = {
            minHumidity: value.current[0].value,
            maxHumidity: value.current[1].value,
            minTemperature: value.current[2].value,
            maxTemperature: value.current[3].value,
            minLight: value.current[4].value,
            maxLight: value.current[5].value,
            userID: 124
        }
        dispatch(updateThreshold(data))
        setShow(false);
    }
    const handleShow = (event) => {
        event.preventDefault(true)
        setShow(true)
    };

    return (
        <div className="py-2 px-0 p-md-4 container w-100 " style={{ minHeight: "90vh", maxWidth: "100%" }}>
            <StatusBar title="Set threshold" />
            <div className="p-3 my-2 mx-2 w-100 bg-white border rounded w-100">
            <div className="d-flex justify-content-end  pb-5">
                {<ThresInfo />}
            </div>
                <form className="container" onSubmit={handleShow} >
                    <div className="row d-flex justify-content-around" >
                        <ThresItem name="Humidity" image={Humidity} color="#1793ED" minValue={{ min: 0, value: dataValue.thresValue[0].min }} maxValue={{ max: 1, value: dataValue.thresValue[0].max }} refer={value} />
                        <ThresItem name="Temperature" image={Temp} color="#FE2F2F" minValue={{ min: 2, value: dataValue.thresValue[1].min }} maxValue={{ max: 3, value: dataValue.thresValue[1].max }} refer={value} />
                        <ThresItem name="Light" image={Light} color="#D65C28" minValue={{ min: 4, value: dataValue.thresValue[2].min }} maxValue={{ max: 5, value: dataValue.thresValue[2].max }} refer={value} />
                    </div>
                    <div className="text-center pt-5">
                        <button type="submit" className="py-1 fs-4 btn btn-success px-3 mt-2" >Save change</button>
                    </div>
                </form>
            </div>
            <Modal show={show} onHide={handleClose} dialogClassName="w-25">
                <Modal.Body className="mt-3 d-flex justify-content-center">Are you sure ?</Modal.Body>
                <Modal.Footer className="border-0 w-75 m-auto d-flex justify-content-between">
                    <Button variant="danger px-4" onClick={ handelSubmit}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default Threshold