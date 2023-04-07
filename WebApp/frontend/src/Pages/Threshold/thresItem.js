const ThresItem = ({ name, image, color, minValue , maxValue, refer }) => {
    return (
        <div style={{ width: "30%", border: "1px", borderRadius: "30px" }} className="container border border-dark p-4 text-center" >
            <h3 style={{ color: color }}>{name}</h3>
            <div className="py-3">
                <img className="w-50" src={image} />
            </div>
            <div className="pt-3 d-flex justify-content-between ">
                <fieldset className="border py-3 rounded" style={{ width: "45%", color: color }}>
                    <legend style={{ fontSize: "15px" }}>Min</legend>
                    <input type="text" pattern="[-\+]?[0-9]+([,\.][0-9]+)?" required  defaultValue={minValue.value} style={{ width: "80%", backgroundColor: color }} className="boder rounded p-1 text-center fs-4 text-white" ref={(el) => refer.current[minValue.min] = el}  />

                </fieldset>
                <fieldset className="border py-3 rounded" style={{ width: "45%", color: color }}>
                    <legend style={{ fontSize: "15px" }}>Max</legend>
                    <input type="text" pattern="[-\+]?[0-9]+([,\.][0-9]+)?" required defaultValue={maxValue.value} style={{ width: "80%", backgroundColor: color }} className="boder rounded p-1 text-center fs-4 text-white" ref={(el) => refer.current[maxValue.max] = el} />
                </fieldset>
            </div>

        </div>
    )
}

export default ThresItem