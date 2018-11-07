var Boo = Boo || {};

Boo.World = class
{
	constructor() {
    this.monsters = [];
    this.player = null;
    this.map = null;
    this.currentLevel = null;
  }

	loadLevel(level) {
	  game.load.tilemap('map', level.map, null, Phaser.Tilemap.TILED_JSON);
	  _.each(level.tilesets, (tileset,key) => game.load.image(key, tileset.image));
	  _.each(level.sprites, (sprite,key) => game.load.spritesheet(key, sprite.image, sprite.width, sprite.height));
	  this.currentLevel = level;
	}

	create()
	{
    this.map = game.add.tilemap('map');
    _.each(this.currentLevel.tilesets, (tmp,key) =>  this.map.addTilesetImage(key));
    this.map.createLayer('floor').resizeWorld();
    this.map.createLayer('items');		
	}

	setPlayer(player, x, y)
	{
		player.setSprite(player.id, x, y);
		this.player = player;
		game.camera.follow(player.sprite, null, 0.1, 0.1);
	}

	addMonster(m, x, y)
	{
		m.setSprite(m.id, x, y);
		this.monsters.push(m);
	}

	removeMonster(m)
	{
		m.sprite.destroy();
		m.sprite = null;

		var tile = this.map.getTile(m._position.x, m._position.y);
		tile.properties.monster = null;

		for (var i = 0; i < this.monsters.length; i++) {
			if (this.monsters[i] == m) {
				this.monsters[i] = null;
				break;
			}
		}
	}

	getPos(x, y)
	{
		return new Boo.WorldPos(x, y);
	}

  getTileset(tileIndex) {
    for (var i = 0; i < this.map.tilesets.length; i++) {
      var ts = this.map.tilesets[i];
      if (ts.containsTileIndex(tileIndex)) {
        return ts;
      }
    }
  }

	update()
	{
		var now = this.player.time;

		for (var i = 0; i < this.monsters.length; i++) {
			var m = this.monsters[i];
			if (!m) continue;
			if (m.action.state == 'done' && m.time < now) m.next();
			m.update();
			if (m.action.state != 'done' && m.action.isBlocking) return;
		}

  	this.player.update();
	}

}