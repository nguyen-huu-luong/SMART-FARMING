export const getUnit = (type) => {
    if (!type) return "";
    if (type === 'Temp' || type.includes("temp")) return "°C"
    if (type === 'Humi'  || type.includes("humi")) return "%"
    if (type === 'Light' || type.includes("light")) return "LUX"
}

export const getColor = (type) => {
    if (!type) return "#000";
    if (type === 'Temp' || type.includes("temp")) return "#E9652D"
    if (type === 'Humi'  || type.includes("humi")) return "#0E9CFF"
    if (type === 'Light' || type.includes("light")) return "#FFD600"
}