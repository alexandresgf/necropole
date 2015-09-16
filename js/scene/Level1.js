define(function (require) {
	var Phaser = require('Phaser'),
		Player = require('../entity/Player'),
		Enemy = require('../entity/Enemy'),
		Combat = require('../Combat'),
		GM = require('../Necropole');

	function Level1() {
		// code me!
	}

	Level1.prototype.constructor = Level1;

	Level1.prototype.preload = function () {
		this.load.tilemap('level1', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('brick', 'assets/tiles/brick.png');
		this.load.image('door-large', 'assets/tiles/door-large-close.png');
		this.load.image('door', 'assets/tiles/door-close.png');
		this.load.image('window', 'assets/tiles/window-close.png');
		this.load.image('player_rsp', 'assets/tiles/player_rsp.png');
		this.load.image('enemy_rsp', 'assets/tiles/enemy_rsp.png');
		this.load.image('player', 'assets/sprites/player.png');
		this.load.image('enemy', 'assets/sprites/enemy.png');
	};

	Level1.prototype.create = function () {
		// Enable global physics system
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Align the viewport
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		// Load map
		this.map = this.game.add.tilemap('level1');
		this.map.addTilesetImage('brick');

		// Load layers
		this.map.createLayer('Background').resizeWorld();
		this.map.createLayer('Foreground');

		// Create player respawn point
		this.player_rsp = this.game.add.group();
		this.map.createFromObjects('House', 5, '', 0, true, false, this.player_rsp);

		// Set player on the map
		this.player_rsp.forEach(function (respawn) {
			this.player = new Player(this.game, respawn.x, respawn.y, GM.PLAYERS[0]);
			this.game.add.existing(this.player);
			this.game.camera.follow(this.player);
		}, this);

		// Create enemy respawn point
		this.enemy_rsp = this.game.add.group();
		this.map.createFromObjects('House', 6, '', 0, true, false, this.enemy_rsp);

		this.enemy_rsp.forEach(function (respawn) {
			this.enemy = new Enemy(this.game, respawn.x, respawn.y, GM.ENEMIES[0]);

			var target = function (enemy, pointer, player) {
				var fight = new Combat(player, enemy);
				fight.start();
			};

			var player = this.player;

			this.enemy.events.onInputDown.add(target, this, 0, player);
			this.game.add.existing(this.enemy);
		}, this);
	};

	return Level1;
});
