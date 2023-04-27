import { Fragment, useEffect, useRef, useState } from "react";
import React from "react";
import { Navigation } from "react-minimal-side-navigation";
import {
  AiOutlineHome,
  AiOutlineCode,
  AiOutlineHistory,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { BsCalendarDate, BsChevronDoubleLeft } from "react-icons/bs";
import { TbDeviceDesktop } from "react-icons/tb";
import { BsMoisture } from "react-icons/bs";
import { MdOutlineLightMode } from "react-icons/md";
import { FaTemperatureHigh } from "react-icons/fa";
import socketIOClient from "socket.io-client";
import avatar from "../../Assets/Image/avatar.webp";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getEnviromentParams,
  updateHumidity,
  updateLight,
  updateTemperature,
} from "../../redux/features/recordSlice";

import "./Sidebar.scss";
import { useViewport } from "../../hooks";
import { host } from "../../redux/store";

function Sidebar({ toggleSidebar }) {
  const socketRef = useRef();

  const currentParams = useSelector((state) => state.records.enviromentParams);
  const dispatch = useDispatch();
  const viewport = useViewport()

  useEffect(() => {
    // connect to host
    socketRef.current = socketIOClient.connect(host);

    // handle when received data from socket server
    socketRef.current.on("CollectTemperature", (data) => {
      dispatch(updateTemperature(data));
    });
    socketRef.current.on("CollectLight", (data) => {
      dispatch(updateLight(data));
    });
    socketRef.current.on("CollectHumidity", (data) => {
      dispatch(updateHumidity(data));
    });

    // socketRef.current.on("receiveACk", (mess) => {
    //   console.log(mess)
    // })

    // disconnect to socket server
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!currentParams[0].value) dispatch(getEnviromentParams());
  }, []);

  const navigate = useNavigate();
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };
  return (
    <Fragment>
      <div
        className={`${viewport.width <= 992 ? "floating-sidebar box-shadow": "position-fixed"}  py-3 shadow`}
        style={{ width: "var(--sidebar-width", minHeight: "100vh", animation: "SidebarFadeIn linear 0.3s" }}
      >
        {/* User avatar */}
        <div className="d-flex justify-content-start align-items-start border-bottom pb-3 px-4 position-relative">
          <img src={avatar} width={100} className="rounded-circle" />
          <div className="ps-3 pt-3">
            <h6>Welcome, </h6>
            <h6>Admin</h6>
          </div>
          <span className="close-sidebar">
            <BsChevronDoubleLeft size={20} className="close-icon" onClick={() => toggleSidebar(false)}/>
          </span>
        </div>

        {/* Current Environmental parameters */}
        <div className="p-4 d-flex flex-wrap justify-content-between text-center">
          <div className="">
            <FaTemperatureHigh color="#E9652D" size={24} />
            <p className="mt-1">{currentParams[0].value} (ºC)</p>
          </div>
          <div className="mx-2">
            <MdOutlineLightMode color="#FFD600" size={24} />
            <p className="mt-1">{currentParams[1].value} (LUX)</p>
          </div>
          <div>
            <BsMoisture color="#0E9CFF" size={24} />
            <p className="mt-1">
              {currentParams[2].value > 10000
                ? kFormatter(currentParams[2].value)
                : currentParams[2].value}{" "}
              (%)
            </p>
          </div>
        </div>

        {/* Menu list */}

        <Navigation
          // you can use your own router's api to get pathname
          activeItemId={document.location.pathname}
          onSelect={({ itemId, index }) => {
            navigate(itemId);
            if (itemId && viewport.width <= 992) toggleSidebar(false)
          }}
          items={[
            {
              title: "Dashboard",
              itemId: "/dashboard",

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
              subNav: [
                // Sử dụng nếu có menu con
                {
                  title: "Water plan",
                  itemId: "/waterplan",
                },
                {
                  title: "Light plan",
                  itemId: "/lightplan",
                },
              ],
            },
            {
              title: "Set threshold",
              itemId: "/Threshold",
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
              subNav: [
                // Sử dụng nếu có menu con
                {
                  title: "View data history",
                  itemId: "/history",
                },
                {
                  title: "View user history",
                  itemId: "/userhistory",
                },
              ],
            },
          ]}
        />
      </div>
    </Fragment>
  );
}

export default Sidebar;
