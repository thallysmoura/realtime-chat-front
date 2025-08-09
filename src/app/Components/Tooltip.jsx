'use client'

// components/Tooltip.js
import React, { useState } from 'react';

const Tooltip = ({ children, Text, position = 'top', Color = 'bg-gray-900' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  const tooltipClasses = `w-full absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 ${Color} rounded-lg shadow-sm opacity-100 ${positionClasses[position] || positionClasses.top}`;

  return (
    <div className="relative inline-block">
      <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip} id="tooltip-button">
        {children}
      </div>
      {isVisible && (
        <div id="tooltip-content" role="tooltip" className={tooltipClasses}>
          {Text}
          <div className={`tooltip-arrow ${positionClasses[position] || positionClasses.top}`}></div>
        </div>
      )}
    </div>
  );
};

// Define as classes para as posições do tooltip e as setas
const positionClasses = {
  top: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full',
  bottom: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full',
  left: 'left-0 top-1/2 transform -translate-y-1/2 -translate-x-full',
  right: 'right-0 top-1/2 transform -translate-y-1/2 translate-x-full'
};

const arrowClasses = {
  top: 'absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-white',
  bottom: 'absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white',
  left: 'absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-white',
  right: 'absolute top-1/2 -left-2 transform -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-white'
};

export default Tooltip;
