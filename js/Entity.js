define(function (require) {
	var Phaser = require('Phaser');

	function Entity(game, x, y, character) {
		Phaser.Sprite.call(this, game, x, y, character.sprite);

		// Set coordinates in the center of sprite
		this.anchor.set(0.5);
	}

	Entity.prototype = Object.create(Phaser.Sprite.prototype);
	Entity.prototype.constructor = Entity;

	return Entity;
});