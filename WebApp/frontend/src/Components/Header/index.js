import * as React from "react";
import logo from "../../Assets/SVG-image/logo.svg";
import { AiOutlineBell, AiOutlineLogout } from "react-icons/ai";
import Popper from "../Popper";
import { Fragment } from "react";
import { IconButton, Tooltip } from "@mui/material";

function Header() {
  let numNotify = 70;
  return (
    <div
      className="w-100 position-fixed d-flex justify-content-between align-items-center px-5 bg-white py-1 shadow-sm"
      style={{ height: "var(--header-height)" }}
    >
      <img src={logo} />
      <div className="d-flex align-items-center">
        <Popper
          toggle={
            <Fragment>
              <AiOutlineBell size={32} />{" "}
              {numNotify > 0 && (
                <span
                  className="position-absolute text-white"
                  style={{
                    right: 2,
                    top: -4,
                    backgroundColor: "red",
                    borderRadius: "50%",
                    width: 22,
                    height: 20,
                    fontSize: 14,
                  }}
                >
                  {numNotify > 100 ? 99 : numNotify}
                </span>
              )}
            </Fragment>
          }
        >
          Hiển thị danh sách thông báo ở đây
        </Popper>
        <Tooltip title="Logout" arrow>
          <IconButton color="default" className="bg-white text-dark">
            <AiOutlineLogout size={32} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default Header;
