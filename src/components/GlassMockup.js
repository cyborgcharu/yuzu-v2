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
      <div className="glass-content font-['Avenir']">
        <h1 className="glass-title font-['Avenir']">Welcome Marc!</h1>
        <p className="glass-info font-['Avenir']">{content}</p>
      </div>
      <div className="glass-button">
        <img src="/menu-icon.png" alt="Menu" />
      </div>
    </div>
  );
};

export default GlassMockup;