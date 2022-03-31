export default class UpdatedScene extends Phaser.Scene {
	#updateList = [];

	updateObj(object) {
		this.#updateList.push(object);
	}

	constructor() {
		super(new.target.name);
	}

	create() {
		this.input.addListener("gameobjectdown", (p, obj) => obj.click(p));
	}

	update() {
		this.#updateList.forEach((o) => o.update());
	}
}
