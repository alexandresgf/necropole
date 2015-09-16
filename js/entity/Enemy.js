define(function (require) {
	var StateMachine = require('state-machine'),
		Character = require('./Character'),
		GM = require('../Necropole');

	function Enemy(game, x, y, character) {
		Character.call(this, game, x, y, character);

		// Interact with inputs
		this.inputEnabled = true;

		// Sight area
		this.apothem = this.width * 4;
		this.graphics = game.add.graphics(0, 0);
		this.graphics.lineStyle(1, 0x00ff00, 1);
	}

	Enemy.prototype = Object.create(Character.prototype);
	Enemy.prototype.constructor = Enemy;

	Enemy.prototype.update = function () {
		this.graphics.drawRect(this.x - this.apothem, this.y - this.apothem, this.apothem * 2, this.apothem * 2);
	};

	Enemy.prototype.onstop = function (event, from, to) {
		console.log(this.name + ' is stopped.');
	};

	Enemy.prototype.onwalk = function (event, from, to) {
		console.log(this.name + ' start walk.');
		this.body.velocity.x = 100;
	};

	Enemy.prototype.onhunt = function (event, from, to) {
		console.log(this.name + ' start hunt.');
	};

	Enemy.prototype.onattack = function (event, from, to) {
		console.log(this.name + ' start attack.');
	};

	StateMachine.create({
		target: Enemy.prototype,
		initial: 'stopped',
		events: [
			{ name: 'stop',     from: 'walking',                to: 'sttoped' },
			{ name: 'walk',     from: ['stopped', 'hunting'],   to: 'walking' },
			{ name: 'hunt',     from: ['attacking', 'walking'], to: 'hunting' },
			{ name: 'attack',   from: 'hunting',                to: 'attacking' }
		]
	});

	return Enemy;
});