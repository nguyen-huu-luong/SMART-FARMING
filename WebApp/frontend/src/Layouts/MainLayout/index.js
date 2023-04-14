import { Fragment, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import "./MainLayout.scss";
import { useViewport } from "../../hooks";

function MainLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const viewport = useViewport()
  return (
    <Fragment>
      <Header toggleSidebar={(status) => setShowSidebar(status)} showSidebar={showSidebar} />
      <div className="w-100 d-flex h-100">
        <div className={`body-wrapper d-flex w-100 p-0`}>
          {showSidebar && (
            <Sidebar
              toggleSidebar={(status) => setShowSidebar(status)}
              show={showSidebar}
            /> 
          )}
          <div
            className="body-bg content w-100"
            style={{ minHeight: "calc(100vh - var(--header-height)", marginLeft: !showSidebar && 0}}
          >
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MainLayout;
