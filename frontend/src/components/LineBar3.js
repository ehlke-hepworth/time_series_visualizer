import React from 'react';
import { Line as LineChart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useNavigate } from 'react-router-dom';
import './Line.css';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

function Line({ data }) {
  const removeDuplicates = (data) => {
    const seen = new Set();
    return data.filter(item => {
      const key = `${item.timestamp}-${item.value}`; // Create a unique key by combining timestamp and text value
      if (seen.has(key)) {
        return false;
      } else {
        seen.add(key);
        return true;
      }
    });
  };
  const sortedData = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const uniqueData = removeDuplicates(sortedData, 'value');

  const navigate = useNavigate();

  // Filter out invalid data and extreme outliers
  const validData = uniqueData.filter(item => 
    item.device_name === "device.bar" &&
    item.parameter === 'tenantB.deviceBar.datasourceC.horse' &&
    item.timestamp &&
    !isNaN(new Date(item.timestamp).getTime()) &&
    item.value &&
    !isNaN(parseFloat(item.value)) &&
    parseFloat(item.value) < 1000 // Example threshold for outliers
  );

    // Filter data for specific parameter and type 'text'
  const textData = uniqueData.filter(item => 
    item.device_name === "device.bar" &&
    item.parameter === 'tenantB.deviceBar.datasourceC.rabbit' &&
    item.type === 'text' &&
    item.timestamp &&
    !isNaN(new Date(item.timestamp).getTime())
  );

  // Calculate moving average for smoothing
  const windowSize = 5; // Size of the moving average window
  const smoothedData = validData.map((item, index, arr) => {
    const window = arr.slice(Math.max(0, index - windowSize + 1), index + 1);
    const average = window.reduce((sum, curr) => sum + parseFloat(curr.value), 0) / window.length;
    return {
      x: new Date(item.timestamp).getTime(),
      y: average,
      text: item.type === 'text' ? item.value.toString() : ''
    };
  });

  const chartData = {
    datasets: [
      {
        label: 'QUX Time Series',
        data: validData.map(item => ({
          x: new Date(item.timestamp).getTime(),
          y: parseFloat(item.value),
          text: item.type === 'text' ? item.value.toString() : ''
        })),
        fill: false,
        backgroundColor: 'rgba(7, 55, 108, 0.2)',
        borderColor: 'rgba(7, 55, 108, 0.3)',
        borderWidth: 5,
      },
      {
        label: 'Smoothed Line',
        data: smoothedData,
        fill: false,
        borderColor: '#0cc37e',
        borderWidth: 4,
        pointRadius: 0
      }
    ]
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
          displayFormats: {
            day: 'yyyy-MM-dd'
          }
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value'
        }
      }
    },
    plugins: {
      legend: {
        display: true
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div>
      <div className="button-container">
        <button onClick={() => navigate('/')} className="home-button">Back to Home</button>
      </div>
      <div style={{ padding: '0 50px' }}> 
      <h1>Datasource C</h1>
      <h2>Horse Time Series</h2>
      <div style={{ height: '420px' }}>
        <LineChart data={chartData} options={chartOptions} />
      </div>
      <table>
        <thead>
        <h2>Rabbit Time Series</h2>
          <tr>
            <th>Timestamp</th>
            <th>Text Value</th>
          </tr>
        </thead>
        <tbody>
          {textData.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Line;