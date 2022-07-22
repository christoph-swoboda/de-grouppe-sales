import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
    },
};

export const PieChart = ({header, color})=> {
    return (
        <div className='mt-5 p-16 rounded-lg bg-white' >
            <h2 className='text-left font-bold mb-1'>{header}</h2>
            <Doughnut data={
                {
                    labels: ['Existing User', 'New User'],
                    datasets: [
                        {
                            label: '# of Votes',
                            data: [29, 19],
                            backgroundColor: [
                                '#3A46A9',
                                color,
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                }
            } options={options} type='doughnut'/>
        </div>
    )
}