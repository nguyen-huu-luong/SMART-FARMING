import Dashboard from "../Pages/Dashboard"
import MainLayout from "../Layouts/MainLayout"
import WaterPlan from "../Pages/Plan/WaterPlan"
import LightPlan from "../Pages/Plan/LightPlan"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import LoginLayout from "../Layouts/LoginLayout"
import Register from "../Pages/Register"
import Devices from "../Pages/Devices/Devices"
import Threshold from "../Pages/Threshold"
import History from "../Pages/History/history"
export const routes = [
    {
        path: '/' , component: Home, layout: null
    },
    {
        path: '/waterplan' , component: WaterPlan, layout: MainLayout
    },
    {
        path: '/lightplan' , component: LightPlan, layout: MainLayout
    },
    {
        path: '/Login' , component:Login, layout: LoginLayout
    },
    {
        path: '/Register' , component: Register, layout: LoginLayout
    },
    {
        path: '/Dashboard' , component: Dashboard, layout: MainLayout
    },
    {
        path: '/devices' , component: Devices, layout: MainLayout
    },
    {
        path: '/Threshold' , component: Threshold, layout: MainLayout
    },
    {
        path: '/history' , component: History, layout: MainLayout
    }
]