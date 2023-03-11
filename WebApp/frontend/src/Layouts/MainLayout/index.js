import { Fragment } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import './MainLayout.scss'

function MainLayout({ children }) {
  return (
    <Fragment>
      <Header />
      <div className="app w-100 d-flex body-bg h-100">
        <div className="body-wrapper d-flex w-100 p-0">
          <Sidebar />
          <div className="content w-100">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}

export default MainLayout;
