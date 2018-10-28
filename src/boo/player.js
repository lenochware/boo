var Boo = Boo || {};

Boo.Player = class extends Boo.Creature
{
	isPlayer()
	{
		return true;
	}

	do(actionName, args)
	{
		if (game.camera.target == null) {
			 game.camera.follow(this.sprite, null, 0.1, 0.1);
		}

		super.do(actionName, args);
	}
}