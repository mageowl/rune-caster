import Dummy from "../objects/Dummy.js";
import Runecaster from "../objects/Runecaster.js";
import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Dungeon extends UpdatedScene {
	entities = null;
	particles = null;

	preload() {
		this.load.image(
			"runecaster.purple",
			"characters/runecaster/runecaster-purple.png"
		);
		this.load.image(
			"runecaster.blue",
			"characters/runecaster/runecaster-blue.png"
		);
		this.load.image("runecaster.staff", "characters/runecaster/staff.png");

		this.load.image("projectile.fire", "projectiles/fireball.png");
		this.load.image("projectile.boom", "projectiles/bomb.png");
	}

	create() {
		super.create();

		this.entities = this.add.group();
		this.particles = {
			fire: this.add.particles("particle.fire"),
			config: {
				fire: {}
			}
		};

		const runecaster = new Runecaster(this, 100, 100, "purple");
		const dummy = new Dummy(this, innerWidth / 2, innerHeight / 2);

		this.input.setDefaultCursor("url(/assets/cursor/dot.png) 5 5, default");
		this.scene.launch("HUD");
	}
}
