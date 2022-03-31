const fire = {
	/**
	 * @param {Phaser.GameObjects.GameObject} obj
	 */
	setup(obj) {
		const scene = obj.scene;
		if (scene.particles?.fire == null) {
			throw new ReferenceError(
				`Scene ${scene.constructor.name} does not have fire particles`
			);
		}
		scene.particles.fire.createEmitter({
			x: obj.x,
			y: obj.y,
			speed: 200,
			lifespan: 3000,
			blendMode: "ADD"
		});
	},
	update(obj) {
		obj.damage(1);
	},
	cleanUp(obj) {}
};

export { fire };
