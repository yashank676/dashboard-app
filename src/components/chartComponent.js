import React from 'react';
import "./chartComponent.css"
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from "chart.js/auto"
import zoomPlugin from 'chartjs-plugin-zoom';
ChartJS.register(zoomPlugin);
const ChartComponent = ({ data, selectedOption }) => {
  const chartData = {
    labels: data.map((item) => item.topic), 
    datasets: [
      {
        label: selectedOption,
        data: data.map((item) => item[selectedOption]),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barThickness: 'flex',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
      },
      zoom: {
        pan: {
            enabled: true,
            mode: 'x'
        },
        zoom: {
            pinch: {
                enabled: true       
            },
            wheel: {
                enabled: true      
            },
            mode: 'x',
        }
    }
    },
    scales: {
      x: {
        max: 10,
        display: false
      },
    }
  };


  return (
    <div className="chart-container">
      <Bar data={chartData} options={chartOptions} />
      <h2>pinch and scroll to see more data in graph</h2>
      </div>
  );
};

export default ChartComponent;
