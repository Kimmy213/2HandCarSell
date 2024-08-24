import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import carJson from '../dataRod/taladrod-cars.min.json';
import './stacked_BarChart.css';
 
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
 
const StackedBarChart = () => {

  const brandMap = carJson.MMList.reduce((acc, brand) => {
    acc[brand.mkID] = brand.Name;
    return acc;
  }, {});
 

  const brandModelData = carJson.Cars.reduce((acc, car) => {
    const brandName = brandMap[car.MkID];
    const modelName = car.Model;
 
    if (brandName) {
      if (!acc[brandName]) {
        acc[brandName] = {};
      }
      if (!acc[brandName][modelName]) {
        acc[brandName][modelName] = 0;
      }
      acc[brandName][modelName] += 1;
    }
    return acc;
  }, {});
 
  const brands = Object.keys(brandModelData);
  const models = Array.from(new Set(carJson.Cars.map(car => car.Model)));
 
  const datasets = models.map(model => ({
    label: model,
    data: brands.map(brand => brandModelData[brand][model] || 0),
    backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
  }));
 
  const chartData = {
    labels: brands,
    datasets: datasets,
  };
 
  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) => {
            const dataset = chartData.datasets[tooltipItem.datasetIndex];
            const brandIndex = tooltipItem.dataIndex;
            const models = dataset.data
              .map((value, index) => {
                if (index === brandIndex) return `${dataset.label}: ${value}`;
                return null;
              })
              .filter((item) => item !== null);
            return models;
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: true,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };
 
  return (
<div className="stacked-bar-container">
<Bar data={chartData} options={options} />
<h2>Car Models by Brand (Stacked Bar Chart)</h2>
</div>
  );
};
 
export default StackedBarChart;