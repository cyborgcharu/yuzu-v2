import React from 'react';

const GlassMockup = () => {
  const toggleMenu = () => {
    // Add your menu toggle logic here
    console.log('Menu toggled');
  };

  return (
    <div className="glass-frame">
      <div className="glass-content">
        <h1 className="glass-title">Hello, World!</h1>
        <p className="glass-info">This is a mockup of Google Glass EE2.</p>
      </div>
      <div className="glass-button" onClick={toggleMenu}>
        <img src="/menu-icon.png" alt="Menu" />
      </div>
    </div>
  );
};

export default GlassMockup;