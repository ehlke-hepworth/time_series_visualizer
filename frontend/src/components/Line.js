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

function Line({ paramName, data }) {
  const removeDuplicates = (data) => {
    const seen = new Set();
    return data.filter(item => {
      const key = `${item.timestamp}-${item.value}`;
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
    item.parameter === paramName &&
    item.timestamp &&
    !isNaN(new Date(item.timestamp).getTime()) &&
    item.value &&
    !isNaN(parseFloat(item.value)) &&
    parseFloat(item.value) < 1000 
  );

  // Filter data for specific parameter and type 'text'
  const textData = uniqueData.filter(item => 
    item.parameter === paramName &&
    item.type === 'text' &&
    item.timestamp &&
    !isNaN(new Date(item.timestamp).getTime())
  );

  // Calculate moving average for smoothing
  const windowSize = 5; 
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
        label: paramName,
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
    <div style={{ padding: '2%' }}>
      <div className="button-container-home">
        <button onClick={() => navigate('/')} className="home-button">Back to Home</button>
      </div>
      <h1>{paramName} Time Series</h1>
      {validData.length > 0 && (
        <div style={{ height: '420px' }}>
          <LineChart data={chartData} options={chartOptions} />
        </div>
      )}
      {textData.length > 0 && (
        <table>
          <thead>
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
      )}
    </div>
  );
}

export default Line;
