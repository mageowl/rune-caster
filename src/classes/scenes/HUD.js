import UpdatedScene from "../template/scenes/UpdatedScene.js";
import RuneCard from "../objects/RuneCard.js";

export default class HUD extends UpdatedScene {
	preload() {
		this.load.image("rune.fire", "runes/fire.png");
		this.load.image("rune.potion", "runes/potion.png");
		this.load.image("rune.arrow", "runes/arrow.png");
		this.load.image("rune.fist", "runes/fist.png");
		this.load.image("rune.boom", "runes/boom.png");
		this.load.image("book", "gui/book.png");
	}

	create() {
		super.create();
		new RuneCard(this, 0, "fire");
		new RuneCard(this, 1, "potion");
		new RuneCard(this, 2, "arrow");
		new RuneCard(this, 3, "boom");

		this.book = this.add.image(20, innerHeight - 250, "book").setOrigin(0, 0);
	}
}
