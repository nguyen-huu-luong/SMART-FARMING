import Dashboard from "../Pages/Dashborad"
import MainLayout from "../Layouts/MainLayout"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import LoginLayout from "../Layouts/LoginLayout"
import Register from "../Pages/Register"

export const routes = [
    {
        path: '/' , component: Home, layout: null
    },
    {
        path: '/Login' , component:Login, layout: LoginLayout
    },
    {
        path: '/Register' , component: Register, layout: LoginLayout
    },
    {
        path: '/Dashboard' , component: Dashboard, layout: MainLayout
    }
]