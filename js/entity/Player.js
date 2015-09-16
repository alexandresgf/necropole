define(function (require) {
	var Character = require('./Character');

	function Player(game, x, y, character) {
		Character.call(this, game, x, y, character);

		// Enable keyboard wrapper
		this._cursors = game.input.keyboard.createCursorKeys();
	}

	Player.prototype = Object.create(Character.prototype);
	Player.prototype.constructor = Player;

	Player.prototype.move = function () {
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;

		if (this._cursors.left.isDown) {
			this.body.velocity.x = -500;
		} else if (this._cursors.right.isDown) {
			this.body.velocity.x = 500;
		}

		if (this._cursors.up.isDown) {
			this.body.velocity.y = -500;
		} else if (this._cursors.down.isDown) {
			this.body.velocity.y = 500;
		}
	};

	Player.prototype.update = function () {
		this.move();
	};

	return Player;
});