import logo from "../../Assets/SVG-image/logo.svg"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <>
            <div className="container-fluid sticky-top py-1 shadow-sm" style={{ backgroundColor: "white" }}>
                <div className="container-fluid row">
                    <div className="col-1">
                        <img src={logo} />
                    </div>
                    <div className="col-9"></div>
                    <div className="col-2 d-flex align-items-center justify-content-end">
                        <Link to="/Login"><button className="btn btn-success " >LOGIN</button></Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Header