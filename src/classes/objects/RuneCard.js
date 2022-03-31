import Runecaster from "./Runecaster.js";

export default class RuneCard extends Phaser.GameObjects.Image {
	/**
	 * Creates a rune card.
	 * @param {UpdatedScene} scene
	 * @param {number} x
	 * @param {number} y
	 * @param {string} rune
	 * @memberof Runecaster
	 */
	constructor(scene, index, rune) {
		super(
			scene,
			innerWidth - (120 + 225 * index),
			innerHeight - 250,
			`rune.${rune}`
		);

		scene.add.existing(this);

		this.setOrigin(0.5, 0).setInteractive({
			cursor: "url(/assets/cursor/dot-purple.png) 5 5, pointer"
		});
		this.rune = rune;
	}

	/**
	 * @param {Phaser.Input.Pointer} pointer
	 * @memberof RuneCard
	 */
	click(pointer) {
		if (pointer.leftButtonDown()) {
			this.destroy();
			Runecaster.runeList.push(this.rune);
			console.log(Runecaster.runeList);
		}
	}
}
