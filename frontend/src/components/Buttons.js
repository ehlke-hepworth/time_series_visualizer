import React, { useState } from 'react';
import './Button.css'; // Ensure this CSS file contains updated styles
import { useNavigate } from 'react-router-dom';

function Buttons({ fetchData }) {
  const navigate = useNavigate();
  const [selectedFoo, setSelectedFoo] = useState('');
  const [selectedBar, setSelectedBar] = useState('');
  const [showFooOptions, setShowFooOptions] = useState(false);
  const [showBarOptions, setShowBarOptions] = useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
    gap: '2%',
    marginTop: '20%' ,
    marginLeft: '29%' ,
    zIndex: 100 ,
    position: 'fixed'
  };

  const handleFooChange = (value) => {
    setSelectedFoo(value);
    fetchData(value);
    navigate(`/device/foo/${value}`);
    setShowFooOptions(false); // Close dropdown after selection
  };

  const handleBarChange = (value) => {
    setSelectedBar(value);
    fetchData(value);
    navigate(`/device/bar/${value}`);
    setShowBarOptions(false); // Close dropdown after selection
  };

  return (
    <div style={containerStyle}>
      <div>
        <div className="select-dropdown" onClick={() => setShowFooOptions(!showFooOptions)}>
          {selectedFoo || "DeviceFoo"}
        </div>
        <div className={`dropdown-content ${showFooOptions ? 'open' : ''}`}>
          <div onClick={() => handleFooChange('datasourceA')}>A: Bar & Foo</div>
          <div onClick={() => handleFooChange('datasourceB')}>B: Garply & Grault</div>
          <div onClick={() => handleFooChange('datasourceC')}>C: xyzzy & Waldo</div>
          <div onClick={() => handleFooChange('datasourceD')}>D: Qux & Baz</div>
        </div>
      </div>
      <div>
        <div className="select-dropdown" onClick={() => setShowBarOptions(!showBarOptions)}>
          {selectedBar || "DeviceBar"}
        </div>
        <div className={`dropdown-content ${showBarOptions ? 'open' : ''}`}>
          <div onClick={() => handleBarChange('datasourceA')}>A: Qux & Baz</div>
          <div onClick={() => handleBarChange('datasourceB')}>B: Cats & Dogs</div>
          <div onClick={() => handleBarChange('datasourceC')}>C: Horses & Rabbits</div>
          <div onClick={() => handleBarChange('datasourceD')}>D: Sheep & Chicken Licken</div>
        </div>
      </div>
    </div>
  );
}

export default Buttons;