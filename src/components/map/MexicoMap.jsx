import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';

import geoData from '../../data/mexico-states.json';

export const MexicoMap = () => {
  const [tooltipContent, setTooltipContent] = useState('');
  // 1. Add new state to track the mouse's X and Y position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // 2. hover updated to handler the capture of the mouse event
  const handleMouseMove = (geo, event) => {
    const stateName = geo.properties.state_name;
    setTooltipContent(stateName);
    // 3. Set the mouse position from the event's clientX and clientY
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setTooltipContent('');
  };
  
  const handleStateClick = (geo) => {
    const stateName = geo.properties.state_name;
    navigate(`/estado/${stateName}`);
  };

  return (
    <div style={{ margin: 'auto', width: '90%', border: 'none' }}>
      <h1>Consulta de Scrapers por Estado</h1>
      
      {/* 4. The tooltip now uses the mousePosition state for its 'top' and 'left' styles */}
      {tooltipContent && (
        <div style={{
          position: 'fixed', // 'fixed' positions it relative to the browser window
          top: mousePosition.y,
          left: mousePosition.x,
          // This transform adds a small offset so the tooltip doesn't cover the cursor
          transform: 'translate(15px, -25px)', 
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '14px',
          zIndex: 999, // Ensure it's on top
          pointerEvents: 'none', // Make the tooltip non-interactive
        }}>
          {tooltipContent}
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup center={[-102, 24]} zoom={2.5}>
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  // 5. Use onMouseMove so the position updates as the cursor moves
                  onMouseMove={(event) => handleMouseMove(geo, event)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleStateClick(geo)}
                  style={{
                    default: { fill: "#2f084d", stroke: "#5c327d", strokeWidth: 0.1, outline: "none" },
                    hover: { fill: "#801b65", stroke: "#FFFFFF", strokeWidth: 0.2, outline: "none" },
                    
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};