import avatar from "../../Assets/Image/avatar.webp";
import { BsMoisture } from "react-icons/bs";
import { FaTemperatureHigh } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Navigate from "../Navigate";
import { Fragment, useState } from "react";

function Sidebar() {
  const [showMenu, setShowMenu] = useState(true);
//   if (!showMenu) {
//     document.querySelector(':root').style.setProperty('--sidebar-width', 0);
//   } else {
//     document.querySelector(':root').style.setProperty('--sidebar-width', 288);
  // }
  return (
    <Fragment>
      {showMenu && <div
        className="position-fixed py-3 shadow"
        style={{ width: "var(--sidebar-width", height: "100vh" }}
      >
        {/* User avatar */}
        <div className="d-flex justify-content-start align-items-start border-bottom pb-3 px-4 position-relative">
          <img src={avatar} width={100} className="rounded-circle" />
          <div className="ps-3 pt-3">
            <h6>Welcome, </h6>
            <h6>Admin</h6>
          </div>
          {/* <span
            className="position-absolute"
            style={{
              right: 16,
              top: "20%",
              opacity: "0.3",
            }}
          >
            <AiOutlineArrowLeft size={20} />
          </span> */}
        </div>

        {/* Current Environmental parameters */}
        <div className="p-4 d-flex flex-wrap justify-content-between text-center">
          <div className="">
            <FaTemperatureHigh color="red" size={24} />
            <p className="mt-1">32 (ºC)</p>
          </div>
          <div className="mx-2">
            <BsMoisture color="blue" size={24} />
            <p className="mt-1">80 (%)</p>
          </div>
          <div>
            <MdOutlineLightMode color="#bfbf1c" size={24} />
            <p className="mt-1">500 (LUX)</p>
          </div>
        </div>

        {/* Menu list */}
        <Navigate />
      </div>}
    </Fragment>
  );
}

export default Sidebar;
