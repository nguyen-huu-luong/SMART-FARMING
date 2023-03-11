import { Link } from "react-router-dom"

const Login = () => {
    return (
        <>
            <div className="container-fluid w-50 ">
                <p className="mb-0">Welcome back</p>
                <h2 >Login to your account</h2>
                <form className="mt-4 mb-5">
                    <div className="mb-3">
                        <label for="userName" className="form-label">Username</label>
                        <input className="form-control" id="userName" />
                    </div>
                    <div className="mb-3">
                        <label for="passWord" className="form-label">Password</label>
                        <input className="form-control" id="passWord" type="password" />
                    </div>
                    <div className="row mb-3 m-0">
                        <div className="col-md form-check ">
                            <input className="form-check-input" type="radio" value="" id="remember" />
                            <label className="form-check-label" for="remember" style={{ fontSize: "12px" }}>
                                Remember me
                            </label>
                        </div>
                        <div className="col-md p-0 d-flex justify-content-end">
                            <Link to="/Login"> <label className="mt-1 text-primary" style={{ fontSize: "12px", cursor: "pointer" }}>Forgot password?</label> </Link>
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <Link to="/Dashboard">  <button type="submit" className="btn btn-success w-100">Login now</button> </Link>
                    </div>
                </form>
                <div className="mt-5 pt-5">
                    <p className="text-center ">Don’t have an account? <Link to="/Register"> <label className="text-primary pe-auto" style={{ cursor: "pointer" }}> Register</label> </Link></p>
                </div>
            </div>

        </>
    )
}

export default Login