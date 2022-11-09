import React, {useState, useEffect} from "react";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';

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
            height: 3
        },
    },
    maintainAspectRatio: false,
    // responsive: true,
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

const BarChartComponent = ({project}) => {

    const Labels = [
        'Vorbereitung / Potenzial  11',
        'Uberleitung an R+V  8',
        'Ersttermin  4',
        'Analysebogen vollstandig  1',
        'SK-Termin  15',
        'Aktuellster Termin/Kontakt  9',
        'iForm an DGAPI  6',
        'DL+GA-Paket von Kunde zuruck  2',
        'DL-Paket unterzeichnet an Kunde  5',
        'AnrAuskunft FA hin  3',
        'AnrAuskunft zuruck  7',
        'MA-Vortrag Termin  10',
        'Projekt-Zusammenfassung  14',
        'Projekt Abschluss Umsetzung  12',
        'ProjektStart Umsetzung  11',
        'Projekt-Absage  12'
    ];

    const labels = project ? [11, 8, 4, 1, 15, 9, 6, 2, 5, 3, 7, 10, 14, 12, 11, 12] : [2, 4, 4, 21, 6, 19, 6, 12, 5, 3, 7, 1, 4, 12, 1, 12]

    const array = {
        labels,
        datasets: [
            {
                id: 1,
                fill: false,
                label: 'Existing Users',
                data: project ? [11, 8, 4, 1, 15, 9, 6, 2, 5, 3, 7, 10, 14, 12, 11, 12] : [2, 4, 4, 21, 6, 19, 6, 12, 5, 3, 7, 1, 4, 12, 1, 12],
                backgroundColor: project ? '#6AD2FF' : '#FF9315',
                tension: 0.1,
                borderColor: project ? '#6AD2FF' : '#FF9315',
            },
        ],
    };

    return (
        <div id="canvas-container">
            <Bar options={options} data={array} redraw/>
        </div>
    )
}

export default BarChartComponent