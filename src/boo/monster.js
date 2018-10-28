var Boo = Boo || {};

Boo.Monster = class extends Boo.Creature
{
	next()
	{
		this.do('walk', [game.rnd.between(-1,1), game.rnd.between(-1,1)]);
	}
}