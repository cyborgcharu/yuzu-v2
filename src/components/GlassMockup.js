// src/components/GlassMockup.js
'use client'
import React from 'react';

const GlassMockup = ({ scriptText = "" }) => {  
  const toggleMenu = (e) => {
    e.stopPropagation();
    console.log('Menu toggled');
  };

  return (
    <div className="glass-frame">
      <div className="glass-content">
        <h1 className="glass-title">Welcome Marc!</h1>
        <p className="glass-info">{scriptText}</p>  {/* Using scriptText instead of content */}
      </div>
      <div className="glass-button" onClick={toggleMenu}>
        <img src="/menu-icon.png" alt="Menu" />
      </div>
    </div>
  );
};

export default GlassMockup;