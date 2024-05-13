import React, { useState } from 'react';
import './Button.css';
import { useNavigate } from 'react-router-dom';

function Buttons({ data }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState({});

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
    gap: '220%',
    marginTop: '20%',
    marginLeft: '32%',
    zIndex: 100,
    position: 'fixed'
  };

  const handleParamSelect = (deviceName, parameter) => {
    navigate(`${deviceName}/${parameter}`);
  };

  const toggleDropdown = (deviceName) => {
    setShowDropdown(prev => ({
      ...prev,
      [deviceName]: !prev[deviceName]
    }));
  };

  console.log('Current state of dropdowns: ', showDropdown);

  return (
    <div style={containerStyle}>
      {data.map((device, index) => (
        <div key={index}>
          <button className="select-dropdown" onClick={() => toggleDropdown(device.deviceName)}>
            {device.deviceName}
          </button>
          {showDropdown[device.deviceName] && (
            <div className="dropdown-content open">
              {device.parameters.map((param, idx) => (
                <div key={idx} onClick={() => handleParamSelect(device.deviceName, param)}>
                  {param}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Buttons;