import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Buttons from './components/Buttons';
import Line from './components/LineFoo1';
import Line2 from './components/LineFoo2';
import Line3 from './components/LineFoo3';
import Line4 from './components/LineFoo4';
import LineB1 from './components/LineBar1';
import LineB2 from './components/LineBar2';
import LineB3 from './components/LineBar3';
import LineB4 from './components/LineBar4';
import dataProphetImage from './03-DataProphet-SquareLogo.jpg'; // Make sure the path is correct

function App() {
  const [deviceData, setDeviceData] = useState([]);
  

  const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:8001/data');
        const data = await response.json();
        setDeviceData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

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
          top: '7%', 
          left: '91%',
          zIndex: 2 
        }} />
        <Routes>
        <Route path="/" element={
          <div className="App" style={{ minHeight: '100vh', width: '100vw', position: 'absolute', zIndex: 1 }}>
            <Header />
            <Buttons fetchData={fetchData} />
          </div>
        } />
          <Route path="/" element={<Buttons fetchData={fetchData} />} />
          <Route path="/device/foo/datasourceA" element={<Line data={deviceData} />} />
          <Route path="/device/foo/datasourceB" element={<Line2 data={deviceData} />} />
          <Route path="/device/foo/datasourceC" element={<Line3 data={deviceData} />} />
          <Route path="/device/foo/datasourceD" element={<Line4 data={deviceData} />} />
          <Route path="/device/bar/datasourceA" element={<LineB1 data={deviceData} />} />
          <Route path="/device/bar/datasourceB" element={<LineB2 data={deviceData} />} />
          <Route path="/device/bar/datasourceC" element={<LineB3 data={deviceData} />} />
          <Route path="/device/bar/datasourceD" element={<LineB4 data={deviceData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;