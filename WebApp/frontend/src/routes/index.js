import Dashboard from "../Pages/Dashborad"
import MainLayout from "../Layouts/MainLayout"
<<<<<<< HEAD
import WaterPlan from "../Pages/Plan/WaterPlan"
import LightPlan from "../Pages/Plan/LightPlan"
=======
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import LoginLayout from "../Layouts/LoginLayout"
import Register from "../Pages/Register"

>>>>>>> aff33cdd7fefc04d28e3436343d6986d0881f04a
export const routes = [
    {
        path: '/' , component: Home, layout: null
    },
    {
<<<<<<< HEAD
        path: '/waterplan' , component: WaterPlan, layout: MainLayout
    },
    {
        path: '/lightplan' , component: LightPlan, layout: MainLayout
    }

=======
        path: '/Login' , component:Login, layout: LoginLayout
    },
    {
        path: '/Register' , component: Register, layout: LoginLayout
    },
    {
        path: '/Dashboard' , component: Dashboard, layout: MainLayout
    }
>>>>>>> aff33cdd7fefc04d28e3436343d6986d0881f04a
]