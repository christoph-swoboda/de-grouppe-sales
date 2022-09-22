import NewCreation from "../pages/newCreation";
import UserManagement from "../pages/userManagement";
import BestantList from "../pages/bestantList";
import Bestant from "../pages/bestant";
import Dashboard from "../pages/dashboard";
import Register from "../pages/register";


export const RouteData=[
    {
        id:5,
        path:'/',
        name:'dashboard',
        component:<Dashboard/>,
        redirection:'/login'
    },
    {
        id:0,
        path:'/new',
        name:'new',
        component:<NewCreation/>,

        redirection:'/login'
    },
    {
        id:2,
        path:"/benutzerverwaltung",
        name:'benutzerverwaltung',
        component:<UserManagement/>,
        redirection:'/login'
    },
    {
        id:1,
        path:"/Bank-Kooperationspartner",
        name:'Bank-Kooperationspartner',
        component:<UserManagement/>,
        redirection:'/login'
    },
    {
        id:3,
        path:'/bestant-list',
        name:'bestant-list',
        component:<BestantList/>,
        redirection:'/login'
    },
    {
        id:4,
        path:'/bestant/:id',
        name:'bestant',
        component:<Bestant/>,
        redirection:'/login'
    },

]
