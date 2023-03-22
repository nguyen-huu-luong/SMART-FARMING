const ThresItem = ({ item }) => {
    return (
        <div style={{ width: "30%", border : "1px",  borderRadius: "30px"}}  className="container border border-dark p-4 text-center" >
            <h3 style={{color: item.color}}>{item.name}</h3>
            <div className="py-3">
                <img className="w-75" src={item.image} />
            </div>
            <input type="text" name={item.name} defaultValue={item.value} style={{backgroundColor: item.color}} className="boder rounded p-1 w-50 text-center fs-4 text-white"/>
        </div>
    )
}

export default ThresItem