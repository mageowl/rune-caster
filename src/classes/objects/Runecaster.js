import UpdatedScene from "../template/scenes/UpdatedScene.js";
import castRunes from "../../util/castRunes.js";
import livingEntity from "../template/objects/LivingEntity.js";

export default class Runecaster extends Phaser.GameObjects.Container {
	static SPEED = 300;
	static ACCELERATION = 10;
	static runeList = [];
	/**
	 * @type {Runecaster}
	 */
	static #instance = null;

	staffSide = 1;

	/**
	 * Creates a player.
	 * @param {UpdatedScene} scene
	 * @param {number} x
	 * @param {number} y
	 * @param {string} color
	 * @memberof Runecaster
	 */
	constructor(scene, x, y, color) {
		const sprite = scene.add
			.sprite(0, 39, `runecaster.${color}`)
			.setScale(0.5)
			.setOrigin(0.5, 1);
		const staff = scene.add
			.sprite(35, 10, `runecaster.staff`)
			.setScale(0.5)
			.setRotation(0.4);

		super(scene, x, y, [sprite, staff]);

		this.objects = { sprite, staff };

		this.setSize(50, 78);

		scene.add.existing(this);
		scene.updateObj(this);
		scene.physics.world.enable(this);
		scene.physics.add.existing(this);
		livingEntity(this, {
			health: 1000
		});

		this.controls = scene.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D
		});

		Runecaster.#instance = this;
	}

	update() {
		const inputFrame = Object.fromEntries(
			Object.entries(this.controls).map(([btn, { isDown }]) => [btn, isDown])
		);

		// Movement
		let xVel = (-inputFrame.left + inputFrame.right) * Runecaster.SPEED;
		let yVel = (-inputFrame.up + inputFrame.down) * Runecaster.SPEED;

		this.body.setVelocity(
			this.body.velocity.x +
				(xVel - this.body.velocity.x) / Runecaster.ACCELERATION,
			this.body.velocity.y +
				(yVel - this.body.velocity.y) / Runecaster.ACCELERATION
		);
		this.objects.sprite.setRotation(this.body.velocity.x / 1000);

		// Staff
		const mouseSide = Math.sign(this.scene.input.x - this.x);
		if (mouseSide !== this.staffSide) {
			this.scene.add.tween({
				targets: this.objects.staff,
				x: 35 * mouseSide,
				rotation: 0.4 * mouseSide,
				duration: 300,
				ease: "Sine.easeInOut"
			});
			this.staffSide = mouseSide;
		}
	}

	static castSpell = () => {
		if (this.runeList.length <= 0) return;
		this.#instance.castSpell(this.runeList);
		this.runeList = [];
	};

	castSpell(runes) {
		const angle = Phaser.Math.Angle.Between(
			this.x,
			this.y,
			this.scene.input.x,
			this.scene.input.y
		);
		let staffRot = angle + Math.PI / 2;
		let diff = staffRot - this.rotation;
		diff += diff < Math.PI ? 0 : -Math.PI * 2;
		staffRot = this.rotation + diff;

		const runecaster = this;
		this.scene.tweens.timeline({
			targets: this.objects.staff,
			duration: 300,
			ease: "Sine.easeInOut",
			tweens: [
				{
					x: Math.cos(angle) * 50,
					y: Math.sin(angle) * 65,
					rotation: staffRot,
					onComplete() {
						castRunes(
							runecaster.scene,
							runes,
							runecaster.x,
							runecaster.y,
							angle
						);
					}
				},
				{
					x: 35 * this.staffSide,
					y: 10,
					rotation: 0.4 * this.staffSide,
					delay: 100
				}
			]
		});
	}
}
