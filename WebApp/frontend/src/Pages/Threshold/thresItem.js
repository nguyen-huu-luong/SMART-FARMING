import { useViewport } from "../../hooks"

const ThresItem = ({ name, image, color, minValue , maxValue, refer }) => {
    const viewport = useViewport()
    return (
        <div className={`container col-sm-12 col-12 col-md-4 my-2`} style={viewport.width >= 1200 ? {width: '30%'}:  {}}>
            <div style={{border: 1, borderRadius: 30}} className="border border-dark p-4 text-center" >
                <h3 style={{ color: color }}>{name}</h3>
                {viewport.width >= 576 && <div className="py-3">
                    <img className="w-50" src={image} />
                </div>}
                <div className="pt-3 d-flex justify-content-between ">
                    <fieldset className="border py-3 rounded" style={{ width: "45%", color: color }}>
                        <legend style={{ fontSize: "15px" }}>Min</legend>
                        <input type="text"   defaultValue={minValue.value} style={{ width: "80%", backgroundColor: color }} className="boder rounded p-1 text-center fs-4 text-white" ref={(el) => refer.current[minValue.min] = el}  />
    
                    </fieldset>
                    <fieldset className="border py-3 rounded" style={{ width: "45%", color: color }}>
                        <legend style={{ fontSize: "15px" }}>Max</legend>
                        <input type="text"  defaultValue={maxValue.value} style={{ width: "80%", backgroundColor: color }} className="boder rounded p-1 text-center fs-4 text-white" ref={(el) => refer.current[maxValue.max] = el} />
                    </fieldset>
                </div>
    
            </div>
        </div>
    )
}

export default ThresItem