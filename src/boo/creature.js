var Boo = Boo || {};

Boo.Creature = class
{
	constructor(params)
	{
		this.sprite = params.sprite;
		this.moving = false;
		this.movingPosition = new Phaser.Point(this.sprite.x, this.sprite.y);
		this.command = {command: null};
	}

	send(command)
	{
		this.command = command || {command: null};
		//if (!this.command.hasOwnProperty(myProp))
	}

	is(attrib) {
		return false;
	}

	canPass(x,y) {
		return map.getTileWorldXY(x, y) == null;
	}

	isMoveFinished()
	{
		return (Phaser.Point.equals(this.sprite.position, this.movingPosition));
	}

	move()
	{
		if (this.moving) {
			this.sprite.animations.play('walk');
		}
		else {
			this.sprite.animations.stop('walk');
			return;
		}

		var STEP = 4;

		var dx = this.sprite.x - this.movingPosition.x;
		var dy = this.sprite.y - this.movingPosition.y;
		
		if (dx > 0) this.sprite.x -= STEP;
		else if (dx < 0) this.sprite.x += STEP;

		if (dy > 0) this.sprite.y -= STEP;
		else if (dy < 0) this.sprite.y += STEP;
	}

	update()
	{
		if (this.isMoveFinished()) this.moving = false;

		if (this.command.command == 'move' && !this.moving) {

			var TILE_SIZE = 32;

			this.movingPosition.x = this.sprite.x + TILE_SIZE * this.command.x;
			this.movingPosition.y = this.sprite.y + TILE_SIZE * this.command.y;
			if (this.canPass(this.movingPosition.x, this.movingPosition.y)) this.moving = true;

			if (this.command.x < 0) this.sprite.scale.x = -2;
			if (this.command.x > 0) this.sprite.scale.x = 2;

			this.send({command: null});
			if (this == world.player) world.nextTurn();
		}

		this.move();

	}	
}