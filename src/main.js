import Runecaster from "./classes/objects/Runecaster.js";
import Dungeon from "./classes/scenes/Dungeon.js";
import HUD from "./classes/scenes/HUD.js";

const game = new Phaser.Game({
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.RESIZE
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		}
	},
	loader: {
		baseURL: "assets"
	},
	scene: [Dungeon, HUD]
});

game.input.mouse.disableContextMenu();
game.canvas.addEventListener("contextmenu", Runecaster.castSpell);
