import React from 'react';
import PropTypes from 'prop-types';
import config from './config';

import './TextOverlay.css';

const TextOverlay = (props) => {
  const artistColor = config.artistTextColor || '#FFFFFF';
  const artistShadowColor = config.artistTextShadowColor || '#000000';
  const titleColor = config.titleTextColor || '#FFFFFF';
  const titleShadowColor = config.titleTextShadowColor || '#000000';

  return (
    <div className="text-container" id="text-overlay" >
      <div className="artist" id="artist" style={{
        color: artistColor,
        textShadow: `0 0 14px ${artistShadowColor}, 0 0 12px ${artistShadowColor}`,
        }}
      >
        {props.artist}
      </div>
      <div className="album" id="album" style={{
        color: titleColor,
        textShadow: `0 0 14px ${titleShadowColor}, 0 0 12px ${titleShadowColor}`,
      }}>
        {props.title}
      </div>
    </div>
  );
}

TextOverlay.propTypes = {
  artist: PropTypes.string,
  title: PropTypes.string,
};

TextOverlay.defaultProps = {
  artist: '',
  title: '',
}

export default TextOverlay;
