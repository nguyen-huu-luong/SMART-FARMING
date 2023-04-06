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
export const getThreshold =  () => API.get('/threshold')
export const updateThreshold = (data) => API.put('/threshold', data)
export const getNotify = () => API.get('/notify')
export const setView = (data) => API.put('/notify/setView', data)
 
