import { Link } from "react-router-dom";
import { register } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Register = () => {

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [checked, setChecked] = useState(false)
    let registerCheck = useSelector((state) => state.user.registerCheck)

    const handelReg = async (event) => {
        event.preventDefault()
        let userName = event.target.userName.value
        let password = event.target.password.value
        let confirm = event.target.confirm.value
        if (password != confirm) {
            alert("Password and confirm password don't match")
        }
        else {
            await dispatch(register({userName: userName, password: password}))
            setChecked(true)
        }
    } 
    if (registerCheck) {
        navigate('/Login')
    }

    return (
        <>
            <div className="container-fluid w-50 ">
                <p className="mb-0">Welcome to BK Farm </p>
                <h2 >Register your account</h2>
                <form className="mt-4 mb-5 was-validated" onSubmit={handelReg}>
                    <div className="mb-3">
                        <label for="userName" className="form-label">Username</label>
                        <input className="form-control" id="userName" name="userName" required minLength={7} />
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out username .</div>
                    </div>
                    <div className="mb-3">
                        <label for="passWord" className="form-label">Password</label>
                        <input className="form-control" id="passWord" type="password" name="password" required minLength={7} />
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out password.</div>
                    </div>
                    <div className="mb-3">
                        <label for="confirm" className="form-label">Confirm Password</label>
                        <input className="form-control" id="confirm"  type="password" name="confirm" required minLength={7} />
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out confirm password.</div>
                    </div>
                    <div className="col-12 mt-4 pt-4">
                         <button type="submit" className="btn btn-success w-100">Register</button> 
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register