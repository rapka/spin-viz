import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash'

import Track from './Track';
import Scope from './Scope';
import TextOverlay from './TextOverlay';
import TrackOverlay from './TrackOverlay';

import './App.css';

const SAMPLE_COUNT = 8;
const DURATION = 84;

function App() {
  const [playing, setPlaying] = useState(false);

  const playFunction = useCallback((event) => {
    if(event.keyCode === 32) {
      event.preventDefault();
      setPlaying(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", playFunction, false);

    return () => {
      document.removeEventListener("keydown", playFunction, false);
    };
  }, [escFunction]);

  const track = (
    <Track
      sampleCount={SAMPLE_COUNT}
      duration={DURATION}
    />
  );

  return (
    <div className="App">
      <Scope playing={playing} />
      <div className="bg-container">
        <img className="bg" src="/bg-repeat.png" />
        <img className="bg2" src="/bg-repeat.png" />
        <img className="bg3" src="/bg-repeat.png" />
      </div>
      <div className="moon-container">
        <div className="track-container">
          {playing ? track : null}
        </div>
      </div>
      <TextOverlay />
      <TrackOverlay title="1. Wokeuplikerick" />
    </div>
  );
}

export default App;
