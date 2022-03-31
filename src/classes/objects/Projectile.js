import eventTarget from "../../util/events.js";
import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
	/**
	 * Shoots a projectile.
	 * @param {UpdatedScene} scene
	 * @param {number} x
	 * @param {number} y
	 * @param {number} dir Direction of projectile in radians
	 * @param {string} texture
	 * @memberof Runecaster
	 */
	constructor(scene, x, y, config) {
		super(scene, x, y, config.texture);

		scene.add.existing(this);
		scene.physics.add.existing(this);
		scene.physics.add.overlap(this, scene.entities, this.hitEntity);

		this.setVelocity(
			Math.cos(config.dir) * config.speed,
			Math.sin(config.dir) * config.speed
		).setRotation(config.dir);

		this.config = config;
		this.emitter = eventTarget(this, ["hitEntity", "hitLocation"]);
	}

	hitEntity = (self, hit) => {
		if (this.config.pierce ?? 0 <= 0) this.destroy();
		else if (this.config.pierce != null) this.config.pierce -= 1;
		this.emitter.emit("hitEntity", hit);
	};
}
