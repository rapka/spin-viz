import React from 'react';

import './Cover.css';

const Cover = (props) => {
  const spinStyles = {};

  spinStyles.animationDuration = `${props.rotationDuration}s`;
  const classes = `cover ${props.playing ? 'cover-playing' : ''} ${props.backwards ? 'cover-reverse' : ''}`;

  return (
    <div className={classes} style={spinStyles}>
      <img src={ props.coverUrl || '/cover.jpg'} className="cover-img"/>
    </div>
  );
}

export default Cover;
