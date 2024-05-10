import React from 'react';
import Image from './DPbackground.jpg'; 

function Header() {
  return (
    <div >
      <img src={Image} alt="Data Prophet Background" style={{
        width: '100%',
        height: 'auto',
        position: 'fixed', 
        top: '18%', 
        left: '0%', 
        zIndex: 2 
      }} />
      
    <header style={{
      width: '100%', 
      position: 'fixed', 
      top: 160, 
      left: 0, 
      padding: '1% 0', 
      zIndex: 5 
    }}>
      <h1 style={{
        position: 'absolute',
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        textAlign: 'center', 
        width: '100%' ,
        color: '#0cc37e',
        font:'ETmodule'
      }}>Ehlke's DataProphet <br></br>Technical Assessment</h1>
    </header>
</div>
  );
}

export default Header;