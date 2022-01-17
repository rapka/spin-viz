import React from 'react';
import classNames from 'classnames';
import set from 'lodash/set';

import config from './config';

import './Background.css';

function Background(props) {
  const { background } = config;
  const { loopDuration, vertical, color, image, css } = background;

  const bgStyles = {};
  const bgContainerStyles = {};

  set(bgStyles, 'animationDuration', `${loopDuration}s`, '0s');
  //set(bgStyles, 'animationDelay', `${background.loopDuration / -2}s`, '0s');

  if (css) {
    bgStyles.background = css;
  } else {
    set(bgStyles, 'backgroundColor', color, undefined);
    set(bgStyles, 'backgroundImage', `url('/${image}')`, '');
  }

  const bgClasses = classNames({
    bg: true,
    'bg-loop': loopDuration,
    'bg-vertical': vertical
  })

  return (
    <div className="bg-container" style={bgContainerStyles}>
      <div className={bgClasses} style={bgStyles} />
    </div>
  );
}

export default Background;
