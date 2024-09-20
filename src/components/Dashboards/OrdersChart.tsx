// BarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersChart: React.FC = () => {
    // Data for the chart
    const data: ChartData<'bar'> = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // X-axis labels
        datasets: [
            {
                data: [168, 175, 160, 200, 207, 212, 123], // Data values
                backgroundColor: '#C9CAEF', // Bar color
                borderColor: '#C9CAEF', // Bar border color
                borderWidth: 1, // Bar border width
                label: "Orders Sold",
                
            },
        ],
    };

    // Options for the chart
    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `Orders Sold: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Start the y-axis at zero
            },
        },
        
    };

    return (
        <div style={{ width: '100%' }}>
            <h2>Orders Sold Each Day</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default OrdersChart;
