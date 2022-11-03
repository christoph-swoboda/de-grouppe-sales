import React from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 1,
            height:3
        },
    },
    scales: {
        xAxes: [
            {
                stacked: true,
                barPercentage: 0.2,
            },
        ],
        yAxes: [
            {
                stacked: true,
                barPercentage: 0.2,
            },
        ],
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                usePointStyle: true,
                pointStyle: 'circle'
            }
        },
        title: {
            display: false,
            text: 'Chart.js Horizontal Bar Chart',
        },
    },
};

export const BarChart = ({data}) => {

    const Labels = [
        'Vorbereitung / Potenzial 11',
        'Uberleitung an R+V 8',
        'Ersttermin 4',
        'Analysebogen vollstandig 1',
        'SK-Termin 15',
        'Aktuellster Termin/Kontakt 9',
        'iForm an DGAPI 6',
        'DL+GA-Paket von Kunde zuruck 2',
        'DL-Paket unterzeichnet an Kunde 5',
        'AnrAuskunft FA hin 3',
        'AnrAuskunft zuruck 7',
        'MA-Vortrag Termin 10',
        'Projekt-Zusammenfassung 14',
        'Projekt Abschluss Umsetzung 12',
        'ProjektStart Umsetzung 11',
        'Projekt-Absage 12'
    ];

    const labels= [11, 8, 4, 1, 15, 9, 6, 2, 5, 3, 7, 10, 14, 12, 11, 12]

    const array = {
        labels,
        datasets: [
            {
                id: 1,
                fill: true,
                label: 'Existing Users',
                data: [11, 8, 4, 1, 15, 9, 6, 2, 5, 3, 7, 10, 14, 12, 11, 12],
                backgroundColor: '#6AD2FF',
                tension: 0.3,
                borderColor: "#6AD2FF",
            },
        ],
    };

    return <Bar options={options} data={array} redraw/>;
}
