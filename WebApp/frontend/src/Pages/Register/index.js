import { Link } from "react-router-dom";

const Register = () => {
    return (
        <>
            <div className="container-fluid w-50 ">
                <p className="mb-0">Welcome to BK Farm </p>
                <h2 >Register your account</h2>
                <form className="mt-4 mb-5">
                    <div className="mb-3">
                        <label for="userName" className="form-label">Username</label>
                        <input className="form-control" id="userName" />
                    </div>
                    <div className="mb-3">
                        <label for="passWord" className="form-label">Password</label>
                        <input className="form-control" id="passWord" type="password" />
                    </div>
                    <div className="mb-3">
                        <label for="confirm" className="form-label">Confirm Password</label>
                        <input className="form-control" id="confirm"  type="password" />
                    </div>
                    <div className="col-12 mt-4 pt-4">
                        <Link to="/Login">  <button type="submit" className="btn btn-success w-100">Register</button> </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register