import React from 'react';
import _ from 'lodash'

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
    }, (this.props.offset) * 1000);
    setTimeout(() => {
      this.setState({ visible: false })
    }, ( this.props.offset + this.props.duration ) * 1000);
  }

  render() {
    let covers = [];

    _.times(this.props.sampleCount, n => {
      covers.push(
        <Cover
          key={n}
          track={this.props.track}
          sample={this.props.sampleCount - n}
          samples={this.props.sampleCount}
          backward={n % 2 === 0}
        />
      )
    });

    return this.state.visible ? (
      <div
        className="track"
        style={{
          // display: this.state.visible ? 'block' : 'none',
        }}
      >
        {covers}
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
