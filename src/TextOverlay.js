import React from 'react';
import PropTypes from 'prop-types';

import './TextOverlay.css';

const TextOverlay = (props) => {
  return (
    <div className="text-container">
      <div className="artist">
        <span className="text-white">{props.artist}</span>
      </div>
      <div className="album">
        <span className="text-white">{props.title}</span>
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
