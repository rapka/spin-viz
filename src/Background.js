import React, { useState, useCallback, useEffect } from 'react';
import set from 'lodash/set';

import Cover from './Cover';
import Scope from './Scope';
import TextOverlay from './TextOverlay';

import config from './config';

import './Background.css';

function Background(props) {
  const { background } = config;

  const bgStyles = {};
  const bgContainerStyles = {};

  set(bgStyles, 'animationDuration', `${background.loopDuration}s`, '0s');
  set(bgStyles, 'animationDelay', `${background.loopDuration / -2}s`, '0s');

  if (background.css) {
    bgStyles.background = background.css;
  } else {
    set(bgStyles, 'backgroundColor', background.color, undefined);
    set(bgStyles, 'backgroundImage', `url('/${background.image}')`, undefined);
  }

  return (
    <div className="bg-container" style={bgContainerStyles}>
      <div className={`bg ${background.loopDuration ? 'bg-loop' : ''}`} style={bgStyles} />
    </div>
  );
}

export default Background;
