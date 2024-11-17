// GlassMockup.js
'use client'

import React from 'react';

const GlassMockup = ({ scriptText }) => {
  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent click from bubbling up to parent
    // Add your menu toggle logic here
    console.log('Menu toggled');
  };

  return (
    <div className="glass-frame">
      <div className="glass-content">
        <h1 className="glass-title">Hello, World!</h1>
        <p className="glass-info">{scriptText}</p>
      </div>
      <div className="glass-button" onClick={toggleMenu}>
        <img src="/menu-icon.png" alt="Menu" />
      </div>
    </div>
  );
};

export default GlassMockup;