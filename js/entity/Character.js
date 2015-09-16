define(function (require) {
	var Entity = require('../Entity');

	function Character(game, x, y, character) {
		Entity.call(this, game, x, y, character);

		// Enable arcade physics
		game.physics.arcade.enable(this);
		this.enableBody = true;
		this.body.allowGravity = false;

		// Character name
		this._name = character.name;

		// Character attributes
		this._attributes = {
			str: {name: 'Strength',     alias: 'STR', value: character.attr.str},
			hab: {name: 'Hability',     alias: 'HAB', value: character.attr.hab},
			end: {name: 'Endurance',    alias: 'END', value: character.attr.end},
			arm: {name: 'Armor',        alias: 'ARM', value: character.attr.arm},
			pow: {name: 'Fire Power',   alias: 'POW', value: character.attr.pow}
		};

		// Life points
		this._life = (this._attributes.end.value === 0) ? 1 : (this._attributes.end.value * 5);

		// Stamina points
		this._stamina = this._life;

		// Experience points
		this._xp = 0;

		// Equipped items
		this._equipments = character.equipments;

		// Inventory
		this._inventory = [];

		// Roll dice d6
		this._roll = function () {
			return Math.floor(Math.random() * (6 - 1)) + 1;
		};

		// Properties
		Object.defineProperty(this, 'name', {
			get: function () {
				return this._name;
			}
		});

		Object.defineProperty(this, 'attributes', {
			get: function () {
				return this._attributes;
			}
		});

		Object.defineProperty(this, 'life', {
			get: function () {
				return this._life;
			},

			set: function (value) {
				this._life -= value;
			}
		});

		Object.defineProperty(this, 'stamina', {
			get: function () {
				return this._stamina;
			}
		});

		Object.defineProperty(this, 'xp', {
			get: function () {
				return this._xp;
			}
		});

		Object.defineProperty(this, 'atkPower', {
			get: function () {
				return this._attributes.hab.value + this._attributes.str.value + this._roll();
			}
		});

		Object.defineProperty(this, 'defPower', {
			get: function () {
				return this._attributes.hab.value + this._attributes.arm.value + this._roll();
			}
		});

		Object.defineProperty(this, 'initiative', {
			get: function () {
				return this._attributes.hab.value + this._roll();
			}
		});
	}

	Character.prototype = Object.create(Entity.prototype);
	Character.prototype.constructor = Character;

	Character.prototype.dodge = function (pAtk) {
		var dodge = this._attributes.hab.value - pAtk.attributes.hab.value;

		if (dodge > 0 && this._roll() <= dodge) {
			console.log(pAtk.name + ' miss.');

			return true;
		}

		return false;
	};

	return Character;
});