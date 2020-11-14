import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash'

import Track from './Track';
import Scope from './Scope';
import TextOverlay from './TextOverlay';
import TrackOverlay from './TrackOverlay';

import './App.css';

const SAMPLE_COUNTS = [8, 9, 6, 7, 4, 3, 9, 4, 8, 8, 5, 6, 5, 5, 8, 6, 10];
const DURATIONS = [84, 145, 96, 124, 81, 46, 83, 128, 151, 152, 119, 137, 147, 135, 129, 123, 192];
// const DURATIONS = [10, 10, 96, 124, 80, 46, 83, 128, 150, 152, 119, 137, 147, 135, 129, 123, 192];

function App() {
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);


  const startTrackTimer = (trackNumber) => {
    setTimeout(() => {
      if (trackNumber === DURATIONS.length - 1) {
        return;
      }
      setTrack(trackNumber + 1);
      startTrackTimer(trackNumber + 1);
    }, (DURATIONS[trackNumber]) * 1000);
  };

  if (playing && track === 0) {
    startTrackTimer(track);
  }

  const escFunction = useCallback((event) => {
    if(event.keyCode === 32) {
      event.preventDefault();
      setPlaying(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  let tracks = [];

  _.each(SAMPLE_COUNTS, (count, i) => {
   tracks.push((
      <Track
        key={i}
        track={i + 1}
        sampleCount={count}
        duration={DURATIONS[i]}
        offset={_.sum(DURATIONS.slice(0, i))}
      />
    ));
  });

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
          {playing ? tracks : null}
        </div>
        <img className="moon" src="/moon2back2.png" />
      </div>
      <TextOverlay />
      <TrackOverlay track={track} />
    </div>
  );
}

export default App;
