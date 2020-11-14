import React from 'react';

import Cover from './Cover';

import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: true });
    }, 0);
    setTimeout(() => {
      this.setState({ visible: false })
    }, this.props.duration * 1000);
  }

  render() {


    return this.state.visible ? (
      <div
        className="track"
        style={{
          // display: this.state.visible ? 'block' : 'none',
        }}
      >
        <Cover />
        <div className="transition-overlay"
          style={{
            animationDelay: '0s',
            animationDuration: `${this.props.duration}s`,
          }}
        />
      </div>
    ) : null;
  }

}

export default Track;
