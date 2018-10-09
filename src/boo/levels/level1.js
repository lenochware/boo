var Boo = Boo || {};
Boo.levels = {};

Boo.levels.level1 = {
	"map": "assets/tilemaps/maps/test_level.json",
	"tiles": "assets/tilemaps/tiles/tiles1_big.png",

	"sprites": {
		"brute": {
			"image": "assets/sprites/brute_big.png",
			"width": 24,
			"height": 32,			
			"animations": {
				"walk": {
					"frames": [4, 5, 6, 7],
					"frameRate": 10
				}
			}
		},
		"warrior": {
			"image": "assets/sprites/warrior_big.png",
			"width": 24,
			"height": 29,			
			"animations": {
				"walk": {
					"frames": [4, 5, 6, 7],
					"frameRate": 10
				}
			}
		}
	}
}