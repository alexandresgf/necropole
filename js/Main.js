define(function (require) {
	var Phaser = require('Phaser'),
		Level1 = require('./scene/Level1'),
		game;

	game = new Phaser.Game(800, 600, Phaser.AUTO, '');
	game.state.add('Level1', Level1);
	game.state.start('Level1');
});