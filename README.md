
This is a React-based music visualizer. It was used for creating many of the music videos on the [College Hill Youtube channel](https://youtube.com/playlist?list=PLo3CZgeQIw_qrPqTIYZDeX2gyGVEwv8GB).

A similar version of this visualizer made specifically for the 2019 College Hill album Overground Underground is available [here](https://github.com/rapka/over-under).

## Setup

```
nvm use
npm ci
npm start
```

Once running, your browser should automatically open to [http://localhost:3000](http://localhost:3000).

Use the spacebar to being playback. There's currently no support for pausing and replaying a song requires a page refresh.

## Configuration

The app is configured via `src/config.json`. It follows the following format:

```
{
	"artist": "",
	"title": "",
	"track": "song.wav",
	"textColor": "#FFFFFF",
	"scopes": {
		"rotationOffset": 0,
		"colors": ["#FFFFFF", "#FFFFFF", "#888888"]
	},
	"background": {
		"color": "#000000",
		"image": "background.jpg",
		"css": "",
		"loopDuration": 0,
		"vertical": false
	},
	"art": {
		"rotationDuration": 66,
		"backwards": false,
		"file": "logo.png",
		"blendMode": "normal"
	}
}
```

Images and audio files should be placed in `/public`.

### Background

Backgrounds can be any valid CSS color or a background image. If `css` is set, it will be used as the CSS `background` shorthand and will override the values for `color` and `image`.

If `loopDuration` is set, its value will determine how long it takes for the background image to loop horizontally (in seconds). the `vertical` flag will make the image move from top to bottom instead of left to right.

### Colors

By default, a waveform will be drawn for each color in `colors`. Colors can be any valid CSS value, excluding the trailing semicolon.

If `rotationOffset` is set, the waveform will change colors, going through the rainbow. In this case, the hues of each waveform in `colors[]` are replaced and separated from each other by the value of `rotationOffset` in degrees. For example, ` { "rotationOffset": 0, colors: ["#FFF", "#FFF"] }` will render two waveforms that begin as red and green respectively.

### Artwork

In addition to the background image, an additional foreground image can be configured in the `art` field. If `rotationDuration` is set, its value will determine how long is takes for the image to spin in seconds. The `backwards` flag will make the image spin counter-clockwise and `blendMode` determines the [CSS blend mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
 used on the image.

