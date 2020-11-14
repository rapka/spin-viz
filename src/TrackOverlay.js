import React from 'react';

import './TrackOverlay.css';

function TrackOverlay(props) {
  return (
    <div className="currentTrack">
      <span className="text-white">{props.title}</span>
    </div>
  );
}

export default TrackOverlay;
