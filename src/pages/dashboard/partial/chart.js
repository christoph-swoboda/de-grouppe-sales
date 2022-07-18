import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const options = {
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: false,
            text: 'Bar Chart',
        },
    },
};

const labels = [8, 4, 1, 15, 9, 6, 2, 5, 3, 7, 10, 14, 12, 11, 12];

export const data = {
    labels,
    datasets: [
        {
            id: 1,
            fill: true,
            label: 'Existing Users',
            data: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
            backgroundColor: '#4318FF',
            tension: 0.3,
            borderColor: "rgba(190, 56, 242, 1)",
        },
        {
            id: 2,
            fill: true,
            label: 'New Users',
            // data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
            data: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            backgroundColor: '#6AD2FF',
            tension: 0.3,
            borderColor: "rgba(190, 56, 242, 1)",
        },
    ],
};

export function Chart() {
    return <Bar options={options} data={data} type='bar' redraw datasetIdKey='id'/>;
}
