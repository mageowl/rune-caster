export default function livingEntity(obj, config) {
	obj.health = config.health;
	obj.activeEffects = [];

	obj.applyEffect = function (effect, time) {
		if (!config.immune.includes(effect.id)) {
			obj.activeEffects.push({
				time,
				update: effect.update,
				cleanUp: effect.cleanUp
			});
			effect.setup(obj);
		}
	};
	obj.updateEffects = function () {
		obj.activeEffects = obj.activeEffects
			.map(({ time, update, cleanUp }) => {
				const timeLeft = time - 1;
				if (timeLeft > 0) {
					update(obj);
					return { time: timeLeft, update, cleanUp };
				} else {
					cleanUp(obj);
				}

				return null;
			})
			.filter((o) => o != null);
	};

	obj.damage = function (hp) {
		obj.health -= hp;

		if (obj.health <= 0) {
			obj.destroy();
		}
	};
}
