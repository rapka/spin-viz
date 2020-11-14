import React from 'react';

import './Scope.css';

let WIDTH = 1920 / 2;
let HEIGHT = 1080;
let H = 0;

const hsvToRgb = (h, s, v) => {
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }

    return [r * 255, g * 255, b * 255];
};


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
      let rgb = hsvToRgb((H / 360),1 , 1);

      const Y_OFFSET = 64;

      canvasCtx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${0.8 - bassNormalized * 1.33})`;
      canvasCtx.beginPath();
      var sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;
      let y = 0;
      let v = 0;

      for(let i = 0; i < bufferLength; i++) {
        v = dataArray[i] / 128.0;
        y = v * HEIGHT / 4;

        if(i === 0) {
          canvasCtx.moveTo(x, y + Y_OFFSET);
        } else {
          canvasCtx.lineTo(x, y + Y_OFFSET);
        }

        x += sliceWidth;
      }

      canvasCtx.stroke();

      let H2 = (H + 180) % 360;
      rgb = hsvToRgb((H2 / 360),1 , 1);

      canvasCtx.strokeStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${0.8 - bassNormalized * 1.33})`;
      canvasCtx.beginPath();
      x = 0;

      for(let i = 0; i < bufferLength; i++) {
        v = dataArray[i] / 128.0;
        y = v * HEIGHT / 4;

        if(i === 0) {
          canvasCtx.moveTo(x, y + + Y_OFFSET - 5);
        } else {
          canvasCtx.lineTo(x, y + Y_OFFSET - 5);
        }

        x += sliceWidth;
      }

       canvasCtx.stroke();
    };

    draw();
  }

  render() {
    return (
      <div className="viz">
        <canvas id="canvas"></canvas>
        <audio
          ref={this.player}
          src="fullmix.mp3"
          type="audio/mpeg"
          preload="auto"
        />
      </div>
    );
  }

}

export default Scope;
