import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import carJson from '../data/taladrod-cars.json';
import '../components/BarChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StackedBarChart = () => {

  const brandMap = useMemo(() => {
    return carJson.MMList.reduce((acc, brand) => {
      acc[brand.mkID] = brand.Name;
      return acc;
    }, {});
  }, []);


  const brandModelData = useMemo(() => {
    return carJson.Cars.reduce((acc, car) => {
      const brandName = brandMap[car.MkID];
      if (brandName) {
        acc[brandName] = acc[brandName] || {};
        acc[brandName][car.Model] = (acc[brandName][car.Model] || 0) + 1;
      }
      return acc;
    }, {});
  }, [brandMap]);

  const brands = useMemo(() => Object.keys(brandModelData), [brandModelData]);
  const models = useMemo(() => Array.from(new Set(carJson.Cars.map(car => car.Model))), []);

  const datasets = useMemo(() => {
    return models.map(model => ({
      label: model,
      data: brands.map(brand => brandModelData[brand][model] || 0),
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }));
  }, [models, brands, brandModelData]);

  const chartData = useMemo(() => ({
    labels: brands,
    datasets: datasets,
  }), [brands, datasets]);

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
            return `${dataset.label}: ${tooltipItem.raw}`;
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
