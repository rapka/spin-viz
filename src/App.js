import React, { useState, useCallback, useEffect } from 'react';
import set from 'lodash/set';

import Track from './Track';
import Scope from './Scope';
import TextOverlay from './TextOverlay';

import config from './config';

import './App.css';

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
  }, [playFunction]);

  const { artist, title, background } = config;

  const bgStyles = {};
  const bgContainerStyles = {};

  set(bgContainerStyles, 'animationDuration', `${background.loopSpeed}s`, '0s');

  if (background.css) {
    bgStyles.background = background.css;
  } else {
    set(bgStyles, 'backgroundColor', background.color, undefined);
    set(bgStyles, 'backgroundImage', `url('/${background.color})`, undefined);
  }

  console.log('bgggg', bgStyles);

  return (
    <div className="App">
      <Scope playing={playing} />
      <div className={`bg-container ${background.loopSpeed ? 'bg-loop' : ''}`} style={bgContainerStyles}>
        <div className="bg" style={bgStyles} />
        <div className="bg bg2" style={bgStyles} />
        <div className="bg bg3" style={bgStyles} />
      </div>
      <div className="moon-container">
        <div className="track-container">
          {playing ? <Track duration={config.duration} /> : null}
        </div>
      </div>
      <TextOverlay
        artist={artist}
        title={title}
      />
    </div>
  );
}

export default App;
