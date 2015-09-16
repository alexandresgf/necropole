define(function () {
	return {
		// Game information
		INFO: {
			NAME: 'Necropole',
			VERSION: '0.1.0a',
			AUTHOR: 'Alexandre \'Todi\' Ferreira',
			COMPANY: 'ALONE at HOME',
			CONTACT: 'alexandre@aloneathome.com'
		},

		// Playable characters
		PLAYERS: [
			{
				name: 'Camila',
				attr: {str: 1, hab: 1, end: 1, arm: 1, pow: 1},
				equipments: {head: null, torso: null, hand: {left: null, right: null}, legs: null, feet: null},
				sprite: 'player'
			}
		],

		// Non-playable characters
		ENEMIES: [
			{
				name: 'Zombie',
				attr: {str: 1, hab: 1, end: 1, arm: 1, pow: 1},
				equipments: {head: null, torso: null, hand: {left: null, right: null}, legs: null, feet: null},
				sprite: 'enemy'
			}
		],

		// Game events
		EVENTS: {
			ENEMY_WALK: 'ENEMY_WALK'
		}
	};
});