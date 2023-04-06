import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import { BsExclamationCircle } from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import { setSched, getWater, deleteSched, modifySched } from "../../redux/features/scheduleSlice";
import ResponsivePagination from "react-responsive-pagination";

const WaterPlan = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  let rec = moment(time).format('h:mm A, dddd, MMMM Do YYYY');
  const [status, setStatus] = useState(2)
  const radioHandler = (status) => {
    setStatus(status);
  };
  const [ids, setIds] = useState("")

  //Send data
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target
    let day = moment(data.date.value).format('YYYY-MM-DD') + ' ' + data.timeF.value
    day = moment(day, 'YYYY-MM-DD HH:mm').format()
    dispatch(setSched({
      time: day,
      weekly: data.weekly.checked,
      type: "water"
    }))
    document.getElementById("frm").reset()
  }
  // Delete data
  const handleDelete = () => {
    dispatch(deleteSched({id: ids}))
  }
  // Weekly
  const handleChange = (_id, weekly) =>{
    const rec = !weekly
    dispatch(modifySched({id: _id, weekly: rec}))
  }
  //Get data
  const water = useSelector((state) => state.schedule.water)
  useEffect(() => {
    dispatch(getWater())
  })
  //Pagination
  const [itemOffset, SetOffset] = useState({ offset: 0, current: 0 })
  const itemPerPage = 6
  const endOffset = itemOffset.offset + itemPerPage
  const waters = water.slice(itemOffset.offset, endOffset)
  const countPage = Math.ceil(water.length / itemPerPage)
  const handelPagination = (event) => {
    const newOffset = ((event - 1) * itemPerPage) % water.length  //event start from 1
    SetOffset({ offset: newOffset, current: (event) })
  }
  return (
    <>
      <div className="modal fade" id="addADate" tabIndex="-1" role="dialog" aria-labelledby="title" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="title">
                Choose time for watering
              </h5>
              <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
            </div>
            <form className="needs-validation" id="frm" onSubmit={(e) => { handleSubmit(e) }}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="date" className="col-form-label">Choose a date</label>
                  <input type="date" className="form-control" min={moment(time).format("YYYY-MM-DD")} defaultValue={moment(time).format("YYYY-MM-DD")} name="date" required />
                  <div className="invalid-feedback">Choose a date</div>
                </div>
                <div className="form-group form-check-inline">
                  <label htmlFor="weekly" className="form-check-label">Weekly</label>
                  <input className="form-check-input form-control" type="checkbox" name="weekly" id="weekly" />
                </div>
                <div className="form-group">
                  <label htmlFor="timeF" className="col-form-label">Choose time</label>
                  <input type="time" min={moment(time).format("HH:mm")} defaultValue={moment(time).format("HH:mm")} className="form-control" id="timeF" required />
                  <div className="invalid-feedback">Choose time</div>
                </div>

                <div className="modal-footer d-flex justify-content-around">
                  <button type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    style={{ backgroundColor: "grey", borderColor: "grey", width: "120px" }}>Hủy</button>
                  <button type="submit" className="btn btn-primary"
                    data-bs-dismiss="modal"
                    style={{ width: "120px" }}>Hoàn thành</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="deleteDate" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ width: "400px", height: "350px" }}>
            <div className="modal-body d-flex flex-column justify-content-around align-items-center font-weight-bold">
              <div className="noti">Delete date from list</div>
              <BsExclamationCircle style={{ width: "100px", height: "100px", color: "red" }} />
              <div className="rework">You can not undo this action</div>
            </div>
            <div className="modal-footer d-flex justify-content-around">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "grey", borderColor: "grey", width: "100px" }}>Hủy</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal"  style={{ backgroundColor: "red", borderColor: "red", width: "100px" }}
              onClick={() => {handleDelete()}}
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
        <div className="row border border-gray-300 rounded bg-white p-3 mx-2 flex-row w-100 justify-content-between align-items-center" id="pick">
          <div className="col-5 form-check d-flex justify-content-end gap-2">
            <input className="form-check-input" type="radio" name="choose" id="def" defaultChecked={status === 1} onClick={(e) => radioHandler(1)} />
            <label className="form-check-label" htmlFor="def">
              Daily watering
            </label>
          </div>
          <div className="col-2 m-0" style={{ display: status === 1 ? 'block' : 'none' }}>
            <div className="form-outline m-0 p-0" id="time">
              <input type="time" className="form-control" id="form1" />
            </div>
          </div>
          <div className="col-5 form-check d-flex justify-content-start gap-2">
            <input className="form-check-input" type="radio" name="choose" id="cus" defaultChecked={status === 2} onClick={(e) => radioHandler(2)} />
            <label className="form-check-label" htmlFor="cus">
              Custom water schedule
            </label>
          </div>
        </div>
        <div className="row border border-gray-300 rounded bg-white p-3 mx-2 flex-row w-100 h-100 justify-content-between align-items-center" id="tool"
          style={{ display: status === 2 ? 'block' : 'none' }}>
          <table className="table table-hover">
            <thead>
              <tr className="align-middle">
                <th scope="col" className="text-start">Schedule</th>
                <th scope="col" className="text-center">Weekly</th>
                <th scope="col" className="text-end"><button type="button" className="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#addADate">Add a date</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {waters.map((current) => (
                <tr key={current._id} className="align-middle">
                  <td> {moment(current.time).format('h:mm A, dddd, MMMM Do YYYY')} </td>
                  <td className="text-center">
                    <input className="form-check-input" type="checkbox" 
                    name="weekly" id={current._id} defaultChecked={current.weekly}
                    onChange={() => handleChange(current._id, current.weekly)}/>
                  </td>
                  <td className="text-end"><button type="button" className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteDate"
                    onClick={() => {setIds(current._id)}}
                    >Delete</button>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
          <div className="row d-flex flex-sm-row flex-column w-100 justify-content-between align-items-center mt-2  gap-1">
            <div className="col d-flex flex-row w-100 justify-content-md-start justify-content-center align-items-center" id="bottom-left">
              <p style={{ color: "#6C757D" }}>Hiển thị {waters.length} trong tổng {water.length} dữ liệu</p>
            </div>
            <div className="col d-flex flex-row w-100 justify-content-md-end justify-content-center align-items-center" id="bottom-right">
              <ResponsivePagination
                current={itemOffset.current}
                total={countPage}
                onPageChange={handelPagination}
              />
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default WaterPlan;
