var Boo = Boo || {};

Boo.World = class
{
	constructor() {
    this.monsters = [];
    this.player = null;

  }

	setPlayer(player)
	{
		this.player = player;
	}

	addMonster(m)
	{
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
  		this.monsters[i].send({command: 'move', x:-1, y:0});
		}
	}
}