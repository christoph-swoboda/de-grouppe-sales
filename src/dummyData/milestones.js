import DateOnly from "../pages/bestant/partial/subSteps/dateOnly";

export const Milestones = [
    {
        id: 0,
        title: 'Uberleitung an R+V',
        component:<DateOnly title={'Uberleitung an R+V'} index={1}/>,
        nextComponent:<DateOnly title={'Ersttermin'} index={2}/>
    },
    {
        id: 1,
        title: 'Ersttermin',
    },
    {
        id: 2,
        title: 'Analysebogen vollstandig',
    },
    {
        id: 3,
        title: 'SK-Termin',
    },
    {
        id: 4,
        title: 'Aktuellster Termin/Kontakt',
    },
    {
        id: 5,
        title: 'iForm an DGAPI',
    },
    {
        id: 6,
        title: 'DL+GA-Paket von Kunde zuruck',
    },
    {
        id: 7,
        title: 'DL-Paket unterzeichnet an Kunde',
    },
    {
        id: 8,
        title: 'AnrAuskunft FA hin',
    },
    {
        id: 9,
        title: 'AnrAuskunft zuruck',
    },
    {
        id: 10,
        title: 'MA-Vortrag Termin',
    },
    {
        id: 11,
        title: 'Projekt-Zusammenfassung',
    },
    {
        id: 12,
        title: 'ProjektStart Umsetzung',
    },
    {
        id: 13,
        title: 'Projekt-Absage',
    }
]