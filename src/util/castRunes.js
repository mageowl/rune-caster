import Projectile from "../classes/objects/Projectile.js";
import UpdatedScene from "../classes/template/scenes/UpdatedScene.js";
import { fire } from "./effects.js";

const runeDef = {
	arrow: {
		type: "action",
		cast(scene, effects, x, y, dir) {
			const projectile = new Projectile(scene, x, y, {
				dir,
				texture: `projectile.${effects[0].rune}`,
				speed: 500
			});
			return new Promise((resolve) => {
				projectile.onEvent("hitEntity", (target) => {
					resolve({ type: "entity", target });
				});
			});
		}
	},
	fire: {
		type: "effect",
		position(x, y) {
			console.log("FIRE HERE!");
		},
		entity(entity) {
			console.log(`FIRE TO U! ${entity.constructor.name}`);
			entity.applyEffect(fire, 500);
		}
	},
	boom: {
		type: "effect",
		position(x, y) {
			console.log("KABAM!");
		},
		entity(entity) {
			console.log("??? GOT EXPLODED");
		}
	}
};

/**
 * Cast runes.
 *
 * @export
 * @param {UpdatedScene} scene
 * @param {string[]} runes
 */
export default function castRunes(scene, runes, x, y, dir) {
	const runeDefs = runes.map((rune) => {
		return { ...runeDef[rune], rune };
	});
	const effects = runeDefs.filter((rune) => rune.type === "effect");
	let action = runeDefs.filter((rune) => rune.type === "action");

	if (action.length !== 1 || effects.length <= 0) {
		console.log("FIZZLE!");
	} else {
		action = action[0];
		action.cast(scene, effects, x, y, dir).then((data) => {
			effects.forEach((effect) => {
				if (data.type === "pos") {
					effect.position(data.x, data.y);
				} else if (data.type === "entity") {
					effect.entity(data.target);
				}
			});
		});
	}
}
