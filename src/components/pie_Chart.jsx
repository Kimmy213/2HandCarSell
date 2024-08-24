import React, { useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import carJson from '../dataRod/taladrod-cars.min.json';
import './pie_Chart.css';
 
ChartJS.register(ArcElement, Tooltip, Legend);
 
const PieChart = () => {
  const chartRef = useRef(null);
 
  const brandMap = carJson.MMList.reduce((acc, brand) => {
    acc[brand.mkID] = brand.Name;
    return acc;
  }, {});
 
  const brandCounts = carJson.Cars.reduce((acc, car) => {
    const brandName = brandMap[car.MkID];
    if (brandName) {
      acc[brandName] = (acc[brandName] || 0) + 1;
    }
    return acc;
  }, {});
 
  const colors = [
    '#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2',
    '#7F7F7F', '#BCBD22', '#17BECF', '#1B4F72', '#641E16', '#9A7D0A', '#515A5A',
    '#0B5345', '#154360', '#512E5F', '#4A235A', '#283747', '#7D6608', '#4D5656',
    '#7E5109', '#1B2631', '#17202A', '#4D5656',
  ];
 
  const chartData = {
    labels: Object.keys(brandCounts),
    datasets: [
      {
        label: 'Number of Cars',
        data: Object.values(brandCounts),
        backgroundColor: colors.slice(0, Object.keys(brandCounts).length),
        hoverBackgroundColor: colors.slice(0, Object.keys(brandCounts).length),
      },
    ],
  };
 
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || '';
            return `${label}: Number of Cars: ${value}`;
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        displayColors: true,
      }
    },
  };
 
  const handleMouseEnter = (brand) => {
    const chart = chartRef.current;
    const index = chartData.labels.indexOf(brand);
 
    if (index !== -1) {
      chart.setActiveElements([{ datasetIndex: 0, index }]);
      chart.tooltip.setActiveElements([{ datasetIndex: 0, index }]);
      chart.update();
 
      const labelElement = document.getElementById(`label-${brand}`);
      if (labelElement && !labelElement.classList.contains('clicked')) {
        labelElement.style.color = colors[index];
      }
    }
  };
 
  const handleMouseLeave = (brand) => {
    const chart = chartRef.current;
    chart.setActiveElements([]);
    chart.tooltip.setActiveElements([]);
    chart.update();
 
    const labelElement = document.getElementById(`label-${brand}`);
    if (labelElement && !labelElement.classList.contains('clicked')) {
      labelElement.style.color = '';
    }
  };
 
  const handleToggleBrand = (brand) => {
    const chart = chartRef.current;
    const index = chartData.labels.indexOf(brand);
 
    if (index !== -1) {
      const meta = chart.getDatasetMeta(0);
      meta.data[index].hidden = !meta.data[index].hidden;
      chart.update();
 
      const labelElement = document.getElementById(`label-${brand}`);
      if (labelElement) {
        if (meta.data[index].hidden) {
          labelElement.classList.add('brand-label-active');
        } else {
          labelElement.classList.remove('brand-label-active');
        }
      }
    }
  };
 
  const handleClearFilters = () => {
    const chart = chartRef.current;
    chartData.labels.forEach((brand, index) => {
      const meta = chart.getDatasetMeta(0);
      meta.data[index].hidden = false;
      const labelElement = document.getElementById(`label-${brand}`);
      if (labelElement) {
        labelElement.classList.remove('brand-label-active');
      }
    });
    chart.update();
  };
 
  return (
    <div className="pie-chart-container">
      <h2>Car Brand Distribution</h2>
      <div className="labels-container">
        {chartData.labels.map((brand) => (
          <span
            key={brand}
            id={`label-${brand}`}
            className="brand-label"
            onMouseEnter={() => handleMouseEnter(brand)}
            onMouseLeave={() => handleMouseLeave(brand)}
            onClick={() => handleToggleBrand(brand)}
          >
            {brand}
          </span>
        ))}
      </div>
      <div className="clear-button-container">
        <button className="clear-button" onClick={handleClearFilters}>
          Clear
        </button>
      </div>
      <Pie ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
};
 
export default PieChart;