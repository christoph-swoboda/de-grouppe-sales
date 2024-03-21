import NewCreation from "../pages/newCreation";
import UserManagement from "../pages/userManagement";
import Firmenprojekte from "../pages/firmenprojekte";
import FirmenprojekteListe from "../pages/milestones";
import Dashboard from "../pages/dashboard";
import AllNotes from "../components/allNotes";
import Documents from "../pages/documents";
import InfoCrawler from "../pages/infoCrawler";
import MailHistory from "../pages/icMailHistory";
import Storfalle from "../pages/Storfalle";
import InfoMail from "../pages/infoMail";
import AdminEdit from "../pages/adminEdit";


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
        path: "/benutzerubersicht",
        name: 'Benutzerübersicht',
        component: <UserManagement/>,
        redirection: '/anmeldung'
    },
    {
        id: 4,
        path: '/firmenprojekte-liste',
        name: 'bestand-list',
        component: <Firmenprojekte/>,
        redirection: '/anmeldung'
    },
    {
        id: 5,
        path: 'firmenprojekte/:portal/:id',
        name: 'bestand',
        component: <FirmenprojekteListe/>,
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
        path: 'alle-notizen/:portal/:company',
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
    {
        id: 9,
        path: 'mail-verlauf',
        name: 'mailVerlauf',
        component: <MailHistory/>,
        redirection: '/anmeldung'
    },
    {
        id: 10,
        path: 'storfalle',
        name: 'Störfälle',
        component: <Storfalle/>,
        redirection: '/anmeldung'
    },
    {
        id: 10,
        path: 'info-mail',
        name: 'infomail',
        component: <InfoMail/>,
        redirection: '/anmeldung'
    },
    {
        id: 10,
        path: 'admin-edit',
        name: 'adminEdit',
        component: <AdminEdit/>,
        redirection: '/anmeldung'
    },
]
