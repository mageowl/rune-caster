import livingEntity from "../template/objects/LivingEntity.js";

export default class Dummy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "character.dummy");

		scene.add.existing(this);
		scene.updateObj(this);
		scene.physics.add.existing(this);
		scene.entities.add(this);
		livingEntity(this, {
			health: 200,
			immune: ["poison"]
		});
	}

	update() {
		this.updateEffects();
	}
}
