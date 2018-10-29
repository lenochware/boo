var Boo = Boo || {};
Boo.levels = {};

Boo.levels.level1 = {
	"map": "assets/tilemaps/maps/test_level.json",
	"tilesets": {
		"tiles1": "assets/tilemaps/tiles/tiles1_big.png",
		"items": "assets/tilemaps/tiles/items_big.png"
	},

	"sprites": {
		"brute": {
			"image": "assets/sprites/brute_big.png",
			"width": 24,
			"height": 32,

			"animations": {
				"idle": {
					"frames": [0, 0, 0, 1, 0, 0, 1, 1],
					"frameRate": 2,
					"loop": true
				},
				"search": {
					"frames": [0, 0, 1, 1],
					"frameRate": 15,
				},				
				"walk": {
					"frames": [4, 5, 6, 7],
					"frameRate": 12
				},
				"attack": {
					"frames": [2, 3, 0],
					"frameRate": 10
				},				
				"die": {
					"frames": [8, 9, 10],
					"frameRate": 8
				}
			}
		},
		"warrior": {
			"image": "assets/sprites/warrior_big.png",
			"width": 24,
			"height": 29,

			"animations": {
				"idle": {
					"frames": [0, 0, 0, 1, 0, 0, 1, 1],
					"frameRate": 2,
					"loop": true
				},
				"search": {
					"frames": [0, 0, 1, 1],
					"frameRate": 15,
				},				
				"walk": {
					"frames": [2, 3, 4, 5, 6, 7],
					"frameRate": 25,
					"loop": true
				},
				"attack": {
					"frames": [13, 14, 15, 0],
					"frameRate": 10
				},				
				"die": {
					"frames": [8, 9, 10, 11, 12, 11],
					"frameRate": 8
				}
			}
		}
	},

	"monsters": {
		"brute": {
			"sprite": "brute",
			"name": "Brute",
			"health": 10,
			"attack": 1
		},

		"warrior": {
			"sprite": "warrior",
			"name": "You",
			"health": 10,
			"attack": 5
		}
	}
}