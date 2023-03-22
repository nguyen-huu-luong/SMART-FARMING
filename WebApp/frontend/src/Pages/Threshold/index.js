import StatusBar from "../../Components/StatusBar"
import ThresItem from "./thresItem"
import Humidity from "../../Assets/Image/humidity.png"
import Temp from "../../Assets/Image/temp.png"
import Light from "../../Assets/Image/light.png"

let datas = [{ image: Humidity, minValue: 3.5, maxValue: 4.0, name: "Humidity", color: "#1793ED" }, { image: Temp, minValue: 20, maxValue: 30, name: "Temp", color: "#FE2F2F" }, { image: Light, minValue: 1600, maxValue: 1810, name: "Light", color: "#D65C28" }]

const Threshold = () => {
    return (
        <div className="container p-4 w-100" style={{ minHeight: "90vh" }}>
            <StatusBar title="Set threshold" />
            <div className="container p-3 py-5 my-2 mx-2 w-100 bg-white border rounded">
                <form className="container" >
                    <div className="container d-flex justify-content-around" >
                        {
                            datas.map((data) => {
                                return (
                                    <ThresItem item={data} />
                                )
                            })
                        }
                    </div>
                    <div className="text-center pt-5">
                        <button type="submit" className="py-1 fs-4 btn btn-success px-3 mt-2">Save change</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Threshold