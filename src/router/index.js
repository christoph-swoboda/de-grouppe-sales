import NewCreation from "../pages/newCreation";
import UserManagement from "../pages/userManagement";
import BestantList from "../pages/bestantList";
import Bestant from "../pages/bestant";
import Dashboard from "../pages/dashboard";
import AllNotes from "../components/allNotes";
import Documents from "../pages/documents";
import ResetPassword from "../pages/resetPassword";
import InfoCrawler from "../pages/infoCrawler";


export const RouteData = [
    {
        id: 0,
        path: '/',
        name: 'dashboard',
        component: <Dashboard/>,
        redirection: '/anmeldung'
    },
    {
        id: 1,
        path: '/neu',
        name: 'new',
        component: <NewCreation/>,
        redirection: '/anmeldung'
    },
    {
        id: 2,
        path: "/benutzerverwaltung",
        name: 'benutzerverwaltung',
        component: <UserManagement/>,
        redirection: '/anmeldung'
    },
    {
        id: 3,
        path: "/bank-Kooperationspartner",
        name: 'Bank-Kooperationspartner',
        component: <UserManagement/>,
        redirection: '/anmeldung'
    },
    {
        id: 4,
        path: '/firmenprojekte-liste',
        name: 'bestand-list',
        component: <BestantList/>,
        redirection: '/anmeldung'
    },
    {
        id: 5,
        path: 'firmenprojekte/:id',
        name: 'bestand',
        component: <Bestant/>,
        redirection: '/anmeldung'
    },
    {
        id: 6,
        path: '/dokumente',
        name: 'dokumente',
        component: <Documents/>,
        redirection: '/anmeldung'
    },
    {
        id: 7,
        path: 'alle-notizen/:company',
        name: 'allNotes',
        component: <AllNotes/>,
        redirection: '/anmeldung'
    },
    {
        id: 8,
        path: 'info-crawler',
        name: 'infoCrawler',
        component: <InfoCrawler/>,
        redirection: '/anmeldung'
    },

]
