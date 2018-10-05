var Boo = Boo || {};

Boo.Creature = class
{
	constructor(params)
	{
		this.params = params;
		this.sprite = null;
		this._visible = false;
		this._moving = false;
		this._position = {};
		this.command = {command: null};
	}

	send(command)
	{
		this.command = command || {command: null};
		//if (!this.command.hasOwnProperty(myProp))
	}

	canPass(x,y) {
		return world.map.getTile(x, y).index != 17;
	}

	setPosition(x, y, setSprite = true)
	{
		this._position.x = x;
		this._position.y = y;
		this._position.worldX = x * world.map.tileWidth + world.map.tileWidth / 2;
		this._position.worldY = y * world.map.tileHeight + world.map.tileHeight / 2;

		if (setSprite) {
			this.sprite.x = this._position.worldX;
			this.sprite.y = this._position.worldY;		
		}
	}

	setSprite(name, x, y)
	{
		if (!this.sprite) {
	    this.sprite = game.add.sprite(0, 0, name);
			this.setPosition(x, y);
	    this.sprite.animations.add('walk', [4, 5, 6, 7], 10, true);
		}

    this.sprite.anchor.set(0.5);

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.setSize(16, 16, 0, 0);
    //this.sprite.scale.setTo(2);
    //sprite.body.collideWorldBounds = true;
	}

	_isMoveFinished()
	{
		return (this.sprite.x == this._position.worldX && this.sprite.y == this._position.worldY);
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

		var dx = this.sprite.x - this._position.worldX;
		var dy = this.sprite.y - this._position.worldY;
		
		if (dx > 0) this.sprite.x -= STEP;
		else if (dx < 0) this.sprite.x += STEP;

		if (dy > 0) this.sprite.y -= STEP;
		else if (dy < 0) this.sprite.y += STEP;
	}

	onNextTurn() {}

  update()
	{
		if (this._isMoveFinished()) this._moving = false;

		if (this.command.command == 'move' && !this._moving) {
			if (this.canPass(this._position.x + this.command.x, this._position.y + this.command.y)) {
				this._moving = true;
				this.setPosition(this._position.x + this.command.x, this._position.y + this.command.y, false);
				this.onNextTurn();
			}

			if (this.command.x < 0) this.sprite.scale.x = -1;
			if (this.command.x > 0) this.sprite.scale.x = 1;

			this.send({command: null});
		}

		this._move();

	}	
}