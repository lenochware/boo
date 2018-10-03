var Boo = Boo || {};

Boo.World = class
{
	constructor() {
    this.monsters = [];
    this.player = null;

  }

	setPlayer(player)
	{
		player.setSprite(player.params.family, player.params.x, player.params.y);
		this.player = player;
		game.camera.follow(player.sprite);
	}

	addMonster(m)
	{
		m.setSprite(m.params.family, m.params.x, m.params.y);
		this.monsters.push(m);
	}

	update()
	{
		for (var i = 0; i < this.monsters.length; i++) {
  		this.monsters[i].update();
		}

  	this.player.update();
	}

	nextTurn()
	{
		for (var i = 0; i < this.monsters.length; i++) {
  		this.monsters[i].live();
		}
	}
}