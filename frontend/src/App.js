import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Buttons from './components/Buttons';
import Line from './components/Line';

import dataProphetImage from './03-DataProphet-SquareLogo.jpg'; 

function App() {
  const [deviceData, setDeviceData] = useState([]);
  const [parameterNames, setParameterNames] = useState([]);

  const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:8001/data');
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setDeviceData(sortedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  const extractParameterNames = (data) => {
    const uniqueParameterNames = new Set(data.map(item => item.parameter));
    return Array.from(uniqueParameterNames);
};
  // Convert Set to Array for each device
  const deviceParams = deviceData.reduce((acc, item) => {
    if (!acc[item.device_name]) {
      acc[item.device_name] = new Set();
    }
    acc[item.device_name].add(item.parameter);
    return acc;
  }, {});

  const structuredData = Object.keys(deviceParams).map(deviceName => ({
    deviceName: deviceName,
    parameters: Array.from(deviceParams[deviceName])
  }));

  // On page load fetch data from server
  useEffect(() => {
    fetchData();
  }, []);

  /*useEffect(() => {
    setDeviceData(removeDuplicates(deviceData));
  }, [deviceData]);*/
  useEffect(() => {
    setParameterNames(extractParameterNames(deviceData));
  }, [deviceData]);

  return (
    <Router>
      <div className="App" style={{
          minHeight: '100vh',
          width: '100vw',
          position: 'relative',
          zIndex: 1
      }}>
        <img src={dataProphetImage} alt="Data Prophet Logo" style={{
          width: '6%',
          height: 'auto',
          position: 'fixed', 
          top: '8.25%', 
          left: '89%',
          zIndex: 2 
        }} />
        <Routes>
        <Route path="/" element={
          <div className="App" style={{ minHeight: '100vh', width: '100vw', position: 'absolute', zIndex: 1 }}>
            <Header />
            <Buttons data={structuredData} />
          </div>
        } />
          {structuredData.map((device, index) => (
            device.parameters.map(param => (
              <Route key={`${device.deviceName}-${param}`} path={`${device.deviceName}/${param}`} element={<Line paramName={param} data={deviceData} />} />
            ))
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
