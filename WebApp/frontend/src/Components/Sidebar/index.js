import { Fragment, useState } from "react";
import React from "react";
import { Navigation } from "react-minimal-side-navigation";
import { AiOutlineHome, AiOutlineCode, AiOutlineHistory } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { TbDeviceDesktop } from "react-icons/tb";
import { BsMoisture } from "react-icons/bs";
import { MdOutlineLightMode } from "react-icons/md";
import { FaTemperatureHigh } from "react-icons/fa";
import avatar from "../../Assets/Image/avatar.webp";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const [showMenu, setShowMenu] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  //   if (!showMenu) {
  //     document.querySelector(':root').style.setProperty('--sidebar-width', 0);
  //   } else {
  //     document.querySelector(':root').style.setProperty('--sidebar-width', 288);
  // }
  return (
    <Fragment>
      {showMenu && (
        <div
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
              <FaTemperatureHigh color="#E9652D" size={24} />
              <p className="mt-1">32 (ºC)</p>
            </div>
            <div className="mx-2">
              <BsMoisture color="#0E9CFF" size={24} />
              <p className="mt-1">80 (%)</p>
            </div>
            <div>
              <MdOutlineLightMode color="#FFD600" size={24} />
              <p className="mt-1">500 (LUX)</p>
            </div>
          </div>

          {/* Menu list */}

          <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/dashboard"
            onSelect={({ itemId }) => {
              navigate(itemId);
            }}
            items={[
              {
                title: "Dashboard",
                itemId: "/dashboard",
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => (
                  <AiOutlineHome color="var(--primary)" size={24} />
                ),
               
              },
              {
                title: "Devices",
                itemId: "/devices",
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => (
                  <TbDeviceDesktop color="var(--primary)" size={24} />
                ),
              },
              {
                title: "Water & light plan",
                elemBefore: () => (
                  <BsCalendarDate color="var(--primary)" size={24} />
                ),
                subNav: [ // Sử dụng nếu có menu con
                  {
                    title: 'Water plan',
                    itemId: '/waterplan',
                  },
                  {
                    title: 'Light plan',
                    itemId: '/lightplan',
                  },
                ],
              },
              {
                title: "Set threshold",
                itemId: "/threshold",
                elemBefore: () => (
                  <AiOutlineCode color="var(--primary)" size={24} />
                ),
              },
              {
                title: "View history",
                itemId: "/history",
                elemBefore: () => (
                  <AiOutlineHistory color="var(--primary)" size={24} />
                ),
              },
            ]}
          />
        </div>
      )}
    </Fragment>
  );
}

export default Sidebar;
