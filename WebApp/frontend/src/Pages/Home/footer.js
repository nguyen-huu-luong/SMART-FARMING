import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs"

let Company = ["About Us", "Why Choose us", "Pricing", "Testimonial"]
let Resources = ["Privacy Policy", "Terms and Condition", "Blog", "Contact Us"]
let Product = ["Project managment", "Time tracker", "Time schedule", "Lead generate", "Remote Collaboration"]
let Icon = [{ icon: <BsFacebook />, linkIcon: "https://www.facebook.com" },
{ icon: <BsTwitter />, linkIcon: "https://twitter.com" },
{ icon: <BsInstagram />, linkIcon: "https://www.instagram.com" },
{ icon: <BsLinkedin />, linkIcon: "https://www.linkedin.com" }
]

const Footer = () => {
    return (
        <>
            <div className="container-fluid text-white p-5 " style={{ backgroundColor: "#222222" }}>
                <div className="container-fluid row ">
                    <div className="col-md-2">
                        <h6 className="mb-3">Company</h6>
                        {
                            Company.map((item) => <p style={{ color: "#C8C4C4", fontSize: "14px" }}>{item}</p>)
                        }
                    </div>
                    <div className="col-md-1"> </div>
                    <div className="col-md-2">
                        <h6 className="mb-3">Resources</h6>
                        {
                            Resources.map((item) => <p style={{ color: "#C8C4C4", fontSize: "14px" }}>{item}</p>)
                        }
                    </div>
                    <div className="col-md-1"> </div>
                    <div className="col-md-2">
                        <h6 className="mb-3">Product</h6>
                        {
                            Product.map((item) => <p style={{ color: "#C8C4C4", fontSize: "14px" }}>{item}</p>)
                        }
                    </div>
                    <div className="col-md-1"> </div>
                    <div className="col-md-3">
                        <h1>Site Title</h1>
                        <p>Subscribe to our News</p>
                        <div className="row">

                            <div className="col-lg-8 p-0 m-0 mb-1">
                                <input type="text" placeholder="Enter your Email" className="h-100 w-100 p-2 rounded ps-2" style={{ backgroundColor: "#2B2E3C", color: "white" }}></input>
                            </div>
                            <div className="col-lg-4 m-0 text-center mb-1">
                                <button className="btn  btn-light p-2 px-3">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid row pt-5">
                    <div className="col-md-3 mb-2"><div style={{ height: "3px", backgroundColor: "#8D8080", marginTop: "15px" }}></div></div>
                    <div className="col-md-1"></div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-sm-7 d-flex align-items-center  ">Copyright @2023</div>
                            <div className="col-sm-5 d-flex justify-content-between align-items-center ">
                                {
                                    Icon.map((item) => <div><a href={item.linkIcon} style={{ color: "#C8C4C4", fontSize: "14px" }}>{item.icon}</a></div>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-3"><div style={{ height: "3px", backgroundColor: "#8D8080", marginTop: "15px" }}></div></div>

                </div>
            </div>
        </>
    )
}

export default Footer