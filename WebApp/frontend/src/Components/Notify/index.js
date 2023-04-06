import { HiOutlineBellAlert } from "react-icons/hi2";
import Content from "./content";

const Notify = ({ item }) => {
    return (
        <div className="">
            <div className="row mb-0 p-0 ">
            {
                item.view ?
                <div className="col-1  m-0 pb-0">{<HiOutlineBellAlert size={20} />}</div>
                : <div className="col-1  m-0 pb-0 text-warning">{<HiOutlineBellAlert size={20} />}</div>
            }
                <p className="col m-0 pb-0">{item.title}</p>
            </div>
            <div className="d-flex justify-content-end pe-4">{<Content item={item} />}</div>

        </div>
    )
}

export default Notify