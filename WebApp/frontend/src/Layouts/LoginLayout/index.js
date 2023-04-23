import LoginImage from "../../Assets/Image/LoginImage.png"
import { useState, useEffect } from 'react';
const LoginLayout = ({children}) => {
    
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        window.onresize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
    }, []);
    return(
        <>
            <div className="container-fluid row m-0 p-0 h-100 overflow-hidden">
            {
                    windowSize.width > 700 ?
                    <>
                <div className="col-6 m-0 p-0 bg-success  overflow-hidden" style={{height: "100vh"}}><img className="w-100 h-100" src={LoginImage} /></div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                    {children}
                </div>
                </>
                :
                <div className="col d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
                    {children}
                </div>
            }
            </div>
        </>
    )
}

export default LoginLayout