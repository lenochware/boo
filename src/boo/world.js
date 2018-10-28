var Boo = Boo || {};

Boo.World = class
{
	constructor() {
    this.monsters = [];
    this.player = null;
    this.map = null;
  }

  // getTile(tileX, tileY)
  // {
  // 	console.log(this.map.getTileWorldXY(x, y))
  // }

	setPlayer(player)
	{
		player.setSprite(player.params.family, player.params.x, player.params.y);
		this.player = player;
		game.camera.follow(player.sprite, null, 0.1, 0.1);
	}

	addMonster(m)
	{
		m.setSprite(m.params.family, m.params.x, m.params.y);
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

	getTileProp(x, y)
	{
		var tile = world.map.getTile(x, y);
		var prop = tile.properties || {};
		prop.wall = (tile.index == 17);
		return prop;
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