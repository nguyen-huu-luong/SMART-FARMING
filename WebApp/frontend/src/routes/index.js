import Dashboard from "../Pages/Dashborad"
import MainLayout from "../Layouts/MainLayout"
import WaterPlan from "../Pages/Plan/WaterPlan"
import LightPlan from "../Pages/Plan/LightPlan"
export const routes = [
    {
        path: '/' , component: Dashboard, layout: MainLayout
    },
    {
        path: '/waterplan' , component: WaterPlan, layout: MainLayout
    },
    {
        path: '/lightplan' , component: LightPlan, layout: MainLayout
    }

]