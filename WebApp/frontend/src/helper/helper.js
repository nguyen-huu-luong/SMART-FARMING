export const getUnit = (type) => {
    if (type == 'Temp') return "°C"
    if (type == 'Humi') return "%"
    if (type == 'Light') return "LUX"
}

export const getColor = (type) => {
    if (type === 'Temp') return "#E9652D"
    if (type === 'Humi') return "#0E9CFF"
    if (type === 'Light') return "#FFD600"
}