import axios from 'axios'
const API = axios.create({baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3003'})

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
export const getAllRecords = (page) => API.get(`/allrecs/${page}`)
export const getRecords = () => API.get('/records')
export const getThreshold =  () => API.get('/threshold')
export const updateThreshold = (data) => API.put('/threshold', data)
export const getNotify = () => API.get('/notify')
export const setView = (data) => API.put('/notify/setView', data)
 export const getAllDeviceS = () => API.get('/devices')
export const getRecordsData = (time)=>API.get(`/records/${time}`)
export const getAvgValues = () => API.get('records/average')
export const getUserActivity = (time) => API.get(`/useract/${time}`)
export const getLight = (page) => API.get(`/getLight/${page}`)
export const getWater = (page) => API.get(`/getWater/${page}`)
export const setSchedule = (schedule) => API.post('/sendSched', schedule)
export const deleteSched = (ids) => API.post('/deleteSched', ids)
export const modifySched = (infor) => API.post('/modifySched', infor)
export const register = (data) => API.post('/register', data)
export const authenticate = (data) => API.post('login', data)
export const getRecordsByTime = (time)=>API.get(`/timerecords/${time}`)
