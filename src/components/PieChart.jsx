import React, { useRef, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import carJson from '../data/taladrod-cars.json';
import '../components/PieChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const chartRef = useRef(null);

  const brandMap = useMemo(() => {
    return carJson.MMList.reduce((acc, brand) => {
      acc[brand.mkID] = brand.Name;
      return acc;
    }, {});
  }, []);

  const brandCounts = useMemo(() => {
    return carJson.Cars.reduce((acc, car) => {
      const brandName = brandMap[car.MkID];
      if (brandName) {
        acc[brandName] = (acc[brandName] || 0) + 1;
      }
      return acc;
    }, {});
  }, [brandMap]);

  const colors = useMemo(() => [
    '#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2',
    '#7F7F7F', '#BCBD22', '#17BECF', '#1B4F72', '#641E16', '#9A7D0A', '#515A5A',
    '#0B5345', '#154360', '#512E5F', '#4A235A', '#283747', '#7D6608', '#4D5656',
    '#7E5109', '#1B2631', '#17202A', '#4D5656',
  ], []);

  const chartData = useMemo(() => ({
    labels: Object.keys(brandCounts),
    datasets: [{
      label: 'Number of Cars',
      data: Object.values(brandCounts),
      backgroundColor: colors.slice(0, Object.keys(brandCounts).length),
      hoverBackgroundColor: colors.slice(0, Object.keys(brandCounts).length),
    }],
  }), [brandCounts, colors]);

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
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

  const handleInteraction = (brand, action) => {
    const chart = chartRef.current;
    const index = chartData.labels.indexOf(brand);

    if (index !== -1) {
      const meta = chart.getDatasetMeta(0);
      const labelElement = document.getElementById(`label-${brand}`);

      if (action === 'enter') {
        chart.setActiveElements([{ datasetIndex: 0, index }]);
        chart.tooltip.setActiveElements([{ datasetIndex: 0, index }]);
        if (labelElement && !labelElement.classList.contains('clicked')) {
          labelElement.style.color = colors[index];
        }
      } else if (action === 'leave') {
        chart.setActiveElements([]);
        chart.tooltip.setActiveElements([]);
        if (labelElement && !labelElement.classList.contains('clicked')) {
          labelElement.style.color = '';
        }
      } else if (action === 'toggle') {
        meta.data[index].hidden = !meta.data[index].hidden;
        if (meta.data[index].hidden) {
          labelElement.classList.add('brand-label-active');
        } else {
          labelElement.classList.remove('brand-label-active');
        }
      }
      chart.update();
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
            onMouseEnter={() => handleInteraction(brand, 'enter')}
            onMouseLeave={() => handleInteraction(brand, 'leave')}
            onClick={() => handleInteraction(brand, 'toggle')}
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
