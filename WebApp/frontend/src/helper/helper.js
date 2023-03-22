export const getUnit = (type) => {
    if (type == 'Temp') return "°C"
    if (type == 'Humi') return "%"
    if (type == 'Light') return "LUX"
}