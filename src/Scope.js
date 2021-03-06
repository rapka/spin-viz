import React from 'react';
import PropTypes from 'prop-types';
import hexRgb from 'hex-rgb';
import hsvToRgb from './util/hsvToRgb';
import times from 'lodash/times';

import './Scope.css';

let WIDTH = 1920 / 2;
let HEIGHT = 1080;
let H = 0;

class Scope extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.player = React.createRef();
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  componentDidUpdate(prevProps) {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    if (!prevProps.playing && this.props.playing) {
      this.audioCtx.resume().then(() => {
        this.player.current.play();
      });
    }
  }

  componentDidMount() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    const audioElement = this.player.current;
    let audioCtx = this.audioCtx;

    var analyser = audioCtx.createAnalyser();

    const canvas = document.getElementById('canvas');
    const canvasCtx = canvas.getContext('2d');

    let source = audioCtx.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 2048;
    analyser.minDecibels = -80;

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    const bassArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    const draw = () => {
      HEIGHT = window.innerHeight;
      WIDTH = window.innerWidth;

      if (this.props.playing) {
        H = (H + 0.5) % 360;
      }

      canvasCtx.canvas.width = WIDTH;
      canvasCtx.canvas.height = HEIGHT;
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);
      analyser.getByteFrequencyData(bassArray);

      let bassValue = (bassArray[0] + bassArray[1] + bassArray[2] + bassArray[3]) / 4;
      bassValue = Math.max(0, 10 * (Math.exp(bassValue * 0.02) - 2));
      const bassNormalized = Math.min(bassValue / 1500, 1) / 2;

      canvasCtx.fillStyle = 'rgba(200, 200, 200, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      canvasCtx.lineWidth = Math.max(bassValue / 100, 2);

      const Y_OFFSET = 64;

      times(this.props.scopeCount, index => {
        const rotatedH = ((H + this.props.rotationOffset) * index) % 360;

        let rgb = hsvToRgb((rotatedH / 360),1 , 1);

        if (this.props.rotateColors) {
          rgb = hsvToRgb((rotatedH / 360),1 , 1);
          canvasCtx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${0.8 - bassNormalized * 1.33})`;
        } else {
          rgb = hexRgb(this.props.colors[index]);
          canvasCtx.strokeStyle = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${0.8 - bassNormalized * 1.33})`;
        }

        canvasCtx.beginPath();
        const sliceWidth = WIDTH * 1.0 / bufferLength;
        let x = 0;
        let y = 0;
        let v = 0;

        for(let i = 0; i < bufferLength; i++) {
          v = dataArray[i] / 128.0;
          y = v * HEIGHT / 4;

          if(i === 0) {
            canvasCtx.moveTo(x, y + (Y_OFFSET - index * 5));
          } else {
            canvasCtx.lineTo(x, y + (Y_OFFSET - index * 5));
          }

          x += sliceWidth;
        }

        canvasCtx.stroke();
      });
    };

    draw();
  }

  render() {
    return (
      <div className="viz">
        <canvas id="canvas"></canvas>
        <audio
          ref={this.player}
          src={this.props.audioSrc}
          type="audio/mpeg"
          preload="auto"
        />
      </div>
    );
  }
}

Scope.propTypes = {
  scopeCount: PropTypes.number, // number of lines to draw
  rotateColors: PropTypes.bool, // flag to automatically cycle through the rainbow
  rotationOffset: PropTypes.number, // when rotateColors is true, hue offset between different scopes (in degrees)
  colors: PropTypes.arrayOf(PropTypes.string), // when rotateColors is false, static color for each scope
  audioSrc: PropTypes.string.isRequired,
};

Scope.defaultProps = {
  scopeCount: 2,
  rotateColors: true,
  rotationOffset: 180,
  colors: ['#FFFFFF', '#FFFFFF'],
}

export default Scope;
