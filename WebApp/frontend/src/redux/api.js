import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:3003"})

// authen
// API.interceptors.request.use((req) => {
//     if (localStorage.getItem("profile")) {
//       req.headers.Authorization = `Bearer ${
//         JSON.parse(localStorage.getItem("profile")).token
//       }`;
//     }
//     return req;
//   });


// code to call api
export const getAllRecords = () => API.get('/allrecs')
export const getRecords = () => API.get('/records')
export const getAllDeviceS = () => API.get('/devices')
export const getRecordsData = (time)=>API.get(`/records/${time}`)
export const getAvgValues = () => API.get('records/average')
export const getUserActivity = () => API.get('/useract')
export const getLight = () => API.get('/getLight')
export const getWater = () => API.get('/getWater')
export const setSchedule = (schedule) => API.post('/sendSched', schedule)
export const deleteSched = (ids) => API.post('/deleteSched', ids)
export const modifySched = (infor) => API.post('/modifySched', infor)