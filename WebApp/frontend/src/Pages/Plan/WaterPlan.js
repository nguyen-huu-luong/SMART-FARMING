import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import { BsExclamationCircle } from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import { setSched, getWater, deleteSched, modifySched } from "../../redux/features/scheduleSlice";
import { Modal, Button, Form } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinFill } from 'react-icons/ri'
import {MdOutlineDone} from 'react-icons/md'
import Pagination from '@mui/material/Pagination';
const WaterPlan = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [curr, SetCurr] = useState(true)
  const [currEdit, SetCurrEdit] = useState(true)

  let rec = moment(time).format('h:mm A, dddd, MMMM Do YYYY')
  const [ids, setIds] = useState("")
  const [curData, setCurData] = useState({})
  //Show modal 
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(!show)
  const handleShow = () => setShow(!show)
  const [showEdit, setShowEdit] = useState(false)
  const handleCloseEdit = () => setShowEdit(!showEdit)
  const handleShowEdit = () => {
    setShowEdit(!showEdit)
    if (moment(curData.time).isAfter(moment(time).format("YYYY-MM-DD"))) {
      SetCurrEdit(false)
    } else SetCurrEdit(true)
  }
  //Send data
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    handleClose()
    const data = e.currentTarget
    let day = moment(data.date.value).format('YYYY-MM-DD') + ' ' + data.timeF.value
    day = moment(day, 'YYYY-MM-DD HH:mm').format()
    dispatch(setSched({
      time: day,
      weekly: data.weekly.checked,
      type: "water",
      dev_id: "202",
      run_time: data.runtime.value
    }))
  }
  // Edit data
  const handleSubmitEdit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    handleCloseEdit()
    const data = e.currentTarget
    console.log(data.runtime.value)
    let day = moment(data.date.value).format('YYYY-MM-DD') + ' ' + data.timeF.value
    day = moment(day, 'YYYY-MM-DD HH:mm').format()
    dispatch(modifySched({
      id: curData._id,
      time: day,
      weekly: data.weekly.checked,
      run_time: data.runtime.value
    }))
  }
  // Delete data
  const handleDelete = () => {
    dispatch(deleteSched({ id: ids }))
  }
  // Handle change date:
  const handle_date = (e) => {
    if (moment(e.currentTarget.value).isAfter(moment(time).format("YYYY-MM-DD"))) {
      SetCurr(false)
    } else SetCurr(true)
  }
  const handle_date_edit = (e) => {
    // console.log(moment(e.currentTarget.value).format("YYYY-MM-DD"), " and ", moment(curData.time).format("YYYY-MM-DD"))
      if (moment(e.currentTarget.value).isAfter(moment(time).format("YYYY-MM-DD"), 'day')) {
        SetCurrEdit(false)
      } else SetCurrEdit(true)
  }
  //Get data and pagination
  const [waterPage, setWaterPage] = useState(1)
  const water = useSelector((state) => state.schedule.water)
  const totalWater = Number(useSelector((state) => state.schedule.totalWater))
  const countWaterPage = Math.ceil(totalWater / 7)
  const setPages = (e, p) => {
      setWaterPage(p);
  }
  useEffect(() => {
    dispatch(getWater(waterPage))
  })
  return (
    <>
      {show && <Modal show={show} onHide={handleClose} backdrop="static" id="add" centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Choose time for watering</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="date" className="col-form-label">Choose a date</label>
              <input type="date" className="form-control" min={moment(time).format("YYYY-MM-DD")}
                defaultValue={moment(time).format("YYYY-MM-DD")} name="date"
                onChange={handle_date}
                required />
              <div className="invalid-feedback">Choose a date</div>
            </div>
            <div className="form-group">
              <label htmlFor="weekly" className="form-check-label">Weekly</label>
              <input className="form-check-input form-control" type="checkbox" name="weekly" id="weekly" />
            </div>
            <div className="form-group">
              <label htmlFor="timeF" className="col-form-label">Choose time</label>
              <input type="time" min={curr ? moment(time).add(1, 'minutes').format("HH:mm") : "00:00"} defaultValue={moment(time).format("HH:mm")} className="form-control" id="timeF" required />
              <div className="invalid-feedback">Choose time</div>
            </div>
            <div className="form-group">
              <label htmlFor="runtime" className="form-label">Device run time &#40;s&#41;:</label>
              <input className="form-control" min={10} defaultValue={10} type="number" name="runtime" id="runtime" required />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="border font-weight-normal px-5" onClick={handleClose}>
              Huỷ
            </Button>
            <Button variant="primary" type="submit">
              Hoàn thành
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>}
      {showEdit && <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" id="edit" centered>
        <Form onSubmit={handleSubmitEdit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Edit watering schedule</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="date" className="col-form-label">Choose a date</label>
              <input type="date" className="form-control" min={moment(time).format("YYYY-MM-DD")}
                onChange={handle_date_edit}
                defaultValue={moment(curData.time).format("YYYY-MM-DD")} name="date"
                required />
              <div className="invalid-feedback">Choose a date</div>
            </div>
            <div className="form-group">
              <label htmlFor="weekly" className="form-check-label">Weekly</label>
              <input className="form-check-input form-control" type="checkbox" name="weekly" id="weekly" defaultChecked={curData.weekly} />
            </div>
            <div className="form-group">
              <label htmlFor="timeF" className="col-form-label">Choose time</label>
              <input type="time" min={currEdit ? moment(time).add(1, 'minutes').format("HH:mm") : "00:00"} defaultValue={moment(curData.time).format("HH:mm")} className="form-control" id="timeF" required />
              <div className="invalid-feedback">Choose time</div>
            </div>
            <div className="form-group">
              <label htmlFor="runtime" className="form-label">Device run time &#40;s&#41;:</label>
              <input className="form-control" min={10} defaultValue={curData.run_time} type="number" name="runtime" id="runtime" required />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="border font-weight-normal px-5" onClick={handleCloseEdit}>
              Huỷ
            </Button>
            <Button variant="primary" type="submit">
              Hoàn thành
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>}
      <div className="modal fade" id="deleteDate" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ width: "400px", height: "350px" }}>
            <div className="modal-body d-flex flex-column justify-content-around align-items-center font-weight-bold">
              <h2>Delete date from list</h2>
              <BsExclamationCircle style={{ width: "100px", height: "100px", color: "red" }} />
              <div className="rework">You can not undo this action</div>
            </div>
            <div className="modal-footer d-flex justify-content-around">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "grey", borderColor: "grey", width: "100px" }}>Hủy</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{ backgroundColor: "red", borderColor: "red", width: "100px" }}
                onClick={() => { handleDelete() }}
              >Xóa</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid p-4 d-flex flex-column w-100 gap-2">
        <div className="row border border-gray-300 rounded bg-white p-3 mx-2 flex-row w-100 justify-content-between align-items-center" id="top-nav">
          <h6 className="col m-0">
            Water schedule
          </h6>
          <h6 className="col m-0 text-end">
            {rec}
          </h6>
        </div>
        <div className="row border border-gray-300 rounded bg-white p-3 mx-2 flex-row w-100 h-100 justify-content-between align-items-center" id="tool">
          <table className="table table-hover">
            <thead>
              <tr className="align-middle">
                <th scope="col" className="text-start">Schedule</th>
                <th scope="col" className="text-center">Weekly</th>
                <th scope="col" className="text-center">Device run time &#40;s&#41;</th>
                <th scope="col" className="text-end">
                  <Button variant="primary" onClick={() => { handleShow() }}>
                    Add a date
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {water.map((current) => (
                <tr key={current._id} className="align-middle" disabled>
                  <td> {moment(current.time).format('h:mm A, dddd, MMMM Do YYYY')} </td>
                  <td className="text-center">
                    {current.weekly && <MdOutlineDone/>}
                  </td>
                  <td className="text-center"> {current.run_time} </td>
                  <td className="text-end d-flex gap-2 flex-row-reverse">
                    <button type="button" className="btn btn-danger ml-2"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteDate"
                      onClick={() => { setIds(current._id) }}
                    ><RiDeleteBinFill /></button>
                    <Button variant="success" onClick={() => { setCurData(current); handleShowEdit() }}>
                      <FiEdit />
                    </Button>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
          <div className="row d-flex flex-sm-row flex-column w-100 justify-content-between align-items-center mt-2  gap-1">
            <div className="col d-flex flex-row w-100 justify-content-md-start justify-content-center align-items-center" id="bottom-left">
              <p style={{ color: "#6C757D" }}>Hiển thị {water.length} trong tổng {totalWater} dữ liệu</p>
            </div>
            <div className="col d-flex flex-row w-100 justify-content-md-end justify-content-center align-items-center" id="bottom-right">
              {/* <ResponsivePagination
                current={itemOffset.current}
                total={countPage}
                onPageChange={handelPagination}
              /> */}
              <Pagination count={countWaterPage} page={waterPage} onChange={setPages} showFirstButton showLastButton/>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default WaterPlan;
