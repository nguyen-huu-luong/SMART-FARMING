import Header from "./header";
import Footer from "./footer";
import home1 from "../../Assets/Image/home1.jpg"
import home2 from "../../Assets/Image/home2.png"
import home3 from "../../Assets/Image/home3.png"
import home4 from "../../Assets/Image/home4.png"
import home5 from "../../Assets/Image/home5.png"
import home6 from "../../Assets/Image/home6.jpg"
import Luong from "../../Assets/Image/Luong.png"
import Triet from "../../Assets/Image/Triet.png"
import Vuong from "../../Assets/Image/Vuong.png"
import Hung from "../../Assets/Image/Hung.png"

let serviceHome = [{titile: "Garden Watering Systems" , img:home2, info: "Lorem ipsum dolor sit amet, consectetur elit. Curabitur euismod enim a metus adipiscing."},
{titile: "Preparing Landscape" , img:home3, info: "Lorem ipsum dolor sit amet, consectetur elit. Curabitur euismod enim a metus adipiscing."},
{titile: "Garden Fence" , img:home4, info: "Lorem ipsum dolor sit amet, consectetur elit. Curabitur euismod enim a metus adipiscing."},
{titile: "Garden Supplies" , img:home5, info: "Lorem ipsum dolor sit amet, consectetur elit. Curabitur euismod enim a metus adipiscing."}
]
let ourTeam = [{titile: "Hoàng Minh Triết" , img:Triet, info: "Triet is the chief executive officer of the farm. He helped the company grow fast."},
{titile: "Liễu Minh Vương" , img:Vuong, info: "Vuong is the largest shareholder. He has made huge investments in the farm."},
{titile: "Nguyễn Hữu Hùng" , img:Hung, info: "Hung is the co-founder of the farm. He researched the technology for farm."},
{titile: "Nguyễn Hữu Lượng" , img:Luong, info: "Luong is the co-founder of the farm. He helped the farm out of the crisis."}
]

const Home = () => {
    return (
        <>
            <Header />
            <div className="container-fluid p-0 m-0 text-center">
                <div className="p-0 m-0"><img src={home1} className="w-100 p-0 m-0" style={{ height: "300px" }} /></div>
                <div className="mt-5 ">
                    <h3 className="pt-3">WELCOME TO THE BK FARM</h3>
                    <p className="fst-italic  text-secondary mb-2">Listed below reasons to choose us! We are active we are professional!</p>
                    <div className="bg-success m-auto pt-0 mt-0" style={{ height: "2px", width: "70px" }}></div>
                </div>
                <div className="mt-4">
                    <p className="w-75 m-auto text-secondary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since theown printer took.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since theown printer took.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since theown printer took. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since theown printer took. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since theown printer took.</p>
                </div>
                <div className="mt-5 mb-5">
                    <h3 className="pt-3">What We Offer</h3>
                    <p className="fst-italic  text-secondary mb-2">Listed below four reasons to choose us!</p>
                    <div className="bg-success m-auto pt-0 mt-0" style={{ height: "3px", width: "70px" }}></div>
                </div>
                <div className="container-fluid row mb-5">
                    {
                        serviceHome.map((item, index) => (
                            <div key={index} className="col-md">
                        <div><img src={item.img} style={{width:"140px", height:"140px"}} />
                            <h6 className="my-3">{item.titile}</h6>
                            <p className="fst-italic  text-secondary">{item.info}</p>
                        </div>
                    </div>
                        ))
                    }
                </div>
                <div className="mt-5 mb-5">
                    <h3 className="pt-3">Our team</h3>
                    <p className="fst-italic  text-secondary mb-2">List of outstanding people!</p>
                    <div className="bg-success m-auto pt-0 mt-0" style={{ height: "2px", width: "70px" }}></div>
                </div>
                <div className="container-fluid row mb-5">
                    {
                        ourTeam.map((item, index) => (
                            <div key={index} className="col-md">
                        <div><img src={item.img} style={{width:"140px", height:"140px"}} />
                            <h6 className="my-3">{item.titile}</h6>
                            <p className="fst-italic  text-secondary mx-2">{item.info}</p>
                        </div>
                    </div>
                        ))
                    }
                </div>
                <div className="container-fluid bg-success position-relative p-0 my-5" >
                    <div className="m-0 p-0">
                        <img className="opacity-50 w-100 m-0 p-0" style={{ height: "400px" }} src={home6} />
                    </div>
                    <div className="row position-absolute d-flex align-items-center" style={{ transform: "translate(-50%, -50%)", top: "50%", left: "50%", borderStyle: "dashed", borderWidth: "2px", borderColor: "white", height: "300px", width: "90%"}}>
                        <div className="col-md-8 " ><h3 className="text-white">Gardener, Complete Solution for Your Landscaping Vision.
                        </h3></div>
                        <div className="col-md-4"><button className="btn btn-outline-light p-3">GET FREE ESTIMATE</button></div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home