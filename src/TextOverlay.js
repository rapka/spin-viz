import React from 'react';
import PropTypes from 'prop-types';
import config from './config';

import './TextOverlay.css';

const TextOverlay = (props) => {
  const color = config.textColor || '#FFFFFF';

  return (
    <div className="text-container" style={{ color }}>
      <div className="artist">
        {props.artist}
      </div>
      <div className="album">
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
