var Boo = Boo || {};

Boo.Creature = class
{
	constructor(params)
	{
		this.params = params;
		this.sprite = null;
		this._visible = false;
		this._moving = false;
		this._movingPosition = new Phaser.Point(this.params.x, this.params.y);
		this.command = {command: null};
	}

	send(command)
	{
		this.command = command || {command: null};
		//if (!this.command.hasOwnProperty(myProp))
	}

	canPass(x,y) {
		return map.getTileWorldXY(x, y) == null;
	}

	setSprite(name, x, y)
	{
		if (!this.sprite) {
	    this.sprite = game.add.sprite(x - 16, y - 16, name);
	    this.sprite.animations.add('walk', [4, 5, 6, 7], 10, true);
		}

    this.sprite.anchor.set(0.5);

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.setSize(16, 16, 0, 0);
    this.sprite.scale.setTo(2);
    //sprite.body.collideWorldBounds = true;
	}

	_isMoveFinished()
	{
		return (Phaser.Point.equals(this.sprite.position, this._movingPosition));
	}

	_move()
	{
		if (this._moving) {
			this.sprite.animations.play('walk');
		}
		else {
			this.sprite.animations.stop('walk');
			return;
		}

		var STEP = 4;

		var dx = this.sprite.x - this._movingPosition.x;
		var dy = this.sprite.y - this._movingPosition.y;
		
		if (dx > 0) this.sprite.x -= STEP;
		else if (dx < 0) this.sprite.x += STEP;

		if (dy > 0) this.sprite.y -= STEP;
		else if (dy < 0) this.sprite.y += STEP;
	}

  update()
	{
		if (this._isMoveFinished()) this._moving = false;

		if (this.command.command == 'move' && !this._moving) {

			var TILE_SIZE = 32;

			this._movingPosition.x = this.sprite.x + TILE_SIZE * this.command.x;
			this._movingPosition.y = this.sprite.y + TILE_SIZE * this.command.y;
			if (this.canPass(this._movingPosition.x, this._movingPosition.y)) this._moving = true;

			if (this.command.x < 0) this.sprite.scale.x = -2;
			if (this.command.x > 0) this.sprite.scale.x = 2;

			this.send({command: null});
			if (this == world.player) world.nextTurn();
		}

		this._move();

	}	
}