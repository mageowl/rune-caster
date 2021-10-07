const game = new Phaser.Game({
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.SCALE
	},
	physics: {
		default: "arcade"
	},
	render: {
		pixelArt: true
	},
	scene: null
});