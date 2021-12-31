import React from 'react';
import config from './config';

import './Cover.css';

const Cover = (props) => {
  const spinStyles = {};

  spinStyles.animationDuration = `${props.rotationDuration}s`;
  const classes = `cover ${props.playing ? 'cover-playing' : ''} ${props.backwards ? 'cover-reverse' : ''}`;
  spinStyles.backgroundImage = `url('${props.coverUrl}')` || '/cover.png';


  return (
  	<div className="cover-container" style={{ mixBlendMode: config.art.blendMode }}>
		<div className={classes} style={spinStyles} />
    </div>
  );
}

export default Cover;
