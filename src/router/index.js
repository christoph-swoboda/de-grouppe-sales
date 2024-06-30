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
import AdminEditSubsteps from "../pages/adminEdit/adminEditSubsteps";
import AdminEditNotes from "../pages/adminEdit/adminEditNotes";
import AdminEditMilestones from "../pages/adminEdit/adminEditMilestones";
import AdminEditFooter from "../pages/adminEdit/adminEditFooter";
import Reporting from "../pages/reporting";
import Upselling from "../pages/Upselling";
import WVHistorie from "../pages/WV-Historie";


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
        id: 11,
        path: 'info-mail',
        name: 'infomail',
        component: <InfoMail/>,
        redirection: '/anmeldung'
    },
    {
        id: 12,
        path: 'admin-edit',
        name: 'adminEdit',
        component: <AdminEditSubsteps/>,
        redirection: '/anmeldung'
    },
    {
        id: 13,
        path: 'admin-edit-milestones',
        name: 'adminEditLabel',
        component: <AdminEditMilestones/>,
        redirection: '/anmeldung'
    },
    {
        id: 14,
        path: 'admin-edit-footer',
        name: 'adminEditFooter',
        component: <AdminEditFooter/>,
        redirection: '/anmeldung'
    },
    {
        id: 15,
        path: 'admin-edit-options',
        name: 'adminEditOptions',
        component: <AdminEditNotes/>,
        redirection: '/anmeldung'
    },
    {
        id: 16,
        path: 'reporting/:portal/:id',
        name: 'reporting',
        component: <Reporting/>,
        redirection: '/anmeldung'
    },
    {
        id: 17,
        path: 'upselling',
        name: 'upselling',
        component: <Upselling/>,
        redirection: '/anmeldung'
    },
    {
        id: 18,
        path: 'WV-Historie',
        name: 'WV-Historie',
        component: <WVHistorie/>,
        redirection: '/anmeldung'
    },
]
