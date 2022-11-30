import React, {useState, useEffect} from "react";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {BarLoader, FadeLoader, SkewLoader} from "react-spinners";

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

const BarChartComponent = ({project, values, loading}) => {
    const labels =  Object.values([values][0])
    const array = {
        labels,
        datasets: [
            {
                id: 1,
                fill: false,
                label: 'Existing Users',
                data: Object.values([values][0]),
                backgroundColor: project ? '#6AD2FF' : '#FF9315',
                tension: 0.1,
                borderColor: project ? '#6AD2FF' : '#FF9315',
            },
        ],
    };

    return (
        <div id="canvas-container">
            {loading && <SkewLoader color={project?'#6AD2FF':'#FF9315'}/>}
            {!loading && <Bar options={options} data={array} redraw/>}
        </div>
    )
}

export default BarChartComponent