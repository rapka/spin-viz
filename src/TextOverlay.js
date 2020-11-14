import React from 'react';

import './TextOverlay.css';

function TextOverlay(props) {
  return (
    <div className="text-container">
      <div className="artist">
        <span className="text-black">College</span>
        <span className="text-white"> Hill</span>
      </div>
      <div className="album">
        <span className="text-black">Overground</span>
        <span className="text-white"> Underground</span>
      </div>
    </div>
  );
}

export default TextOverlay;
