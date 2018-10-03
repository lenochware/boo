var Boo = Boo || {};

Boo.Monster = class extends Boo.Creature
{
	live()
	{
		this.send({command: 'move', x:game.rnd.between(-1,1), y:game.rnd.between(-1,1)});
	}
}