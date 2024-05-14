import React from "react";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {SkewLoader} from "react-spinners";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChartComponent = ({project, values, loading, left, formattedValues}) => {

     const options = {
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
                text: '',
            },
        },
    };

    const labels =  Object.values([formattedValues][0])
    const array = {
        labels,
        datasets: [
            {
                id: 1,
                fill: false,
                label: left?'Firmenprojekte': 'Mitarbeiter',
                data: Object.values([values][0]),
                backgroundColor: project && !left ? '#7480e1' :project && left ? '#3A46A9' :left && !project? '#e8891a': '#ad7430' ,
                tension: 0.1,
                borderColor: project && !left ? '#7480e1' :project && left ? '#3A46A9' :left && !project? '#e8891a': '#ad7430',
            },
        ],
    };

    return (
        <div id={`${left?'canvas-container' :'canvas-container2'}`}>
            {loading && <SkewLoader size='10px' color={project && !left ? '#7480e1' :project && left ? '#3A46A9' :left && !project? '#e8891a': '#ad7430'}/>}
            {!loading && <Bar options={options} data={array} redraw={false}/>}
        </div>
    )
}

export default BarChartComponent