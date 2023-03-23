const ThresItem = ({ item }) => {
    return (
        <div style={{ width: "30%", border: "1px", borderRadius: "30px" }} className="container border border-dark p-4 text-center" >
            <h3 style={{ color: item.color }}>{item.name}</h3>
            <div className="py-3">
                <img className="w-50" src={item.image} />
            </div>
            <div className="pt-3 d-flex justify-content-between ">
                <fieldset className="border py-3 rounded" style={{ width: "45%", color: item.color }}>
                    <legend style={{ fontSize: "15px" }}>Min</legend>
                    <input type="text" name={`min${item.name}`} defaultValue={item.minValue} style={{ width: "80%", backgroundColor: item.color }} className="boder rounded p-1 text-center fs-4 text-white" />
                </fieldset>
                <fieldset className="border py-3 rounded" style={{ width: "45%", color: item.color }}>
                    <legend style={{ fontSize: "15px" }}>Max</legend>
                    <input type="text" name={`max${item.name}`} defaultValue={item.maxValue} style={{ width: "80%", backgroundColor: item.color }} className="boder rounded p-1 text-center fs-4 text-white" />
                </fieldset>
            </div>

        </div>
    )
}

export default ThresItem