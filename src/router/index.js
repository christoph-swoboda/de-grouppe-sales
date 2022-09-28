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
        redirection:'/anmeldung'
    },
    {
        id:0,
        path:'/neu',
        name:'new',
        component:<NewCreation/>,
        redirection:'/anmeldung'
    },
    {
        id:2,
        path:"/benutzerverwaltung",
        name:'benutzerverwaltung',
        component:<UserManagement/>,
        redirection:'/anmeldung'
    },
    {
        id:1,
        path:"/Bank-Kooperationspartner",
        name:'Bank-Kooperationspartner',
        component:<UserManagement/>,
        redirection:'/anmeldung'
    },
    {
        id:3,
        path:'/bestand-liste',
        name:'bestant-list',
        component:<BestantList/>,
        redirection:'/anmeldung'
    },
    {
        id:4,
        path:'/bestand/:id',
        name:'bestant',
        component:<Bestant/>,
        redirection:'/anmeldung'
    },

]