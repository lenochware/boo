var Boo = Boo || {};

Boo.Hero = class
{
	constructor(params)
	{
		this.sprite = params.sprite;
		this.moving = 'none';
		this.toX = sprite.x;
		this.toY = sprite.y;
		this.command = 'none';
	}

	//only if it is not moving
	setMove(m)
	{
		if (this.moving != 'none') return;

		var x = this.sprite.x;
		var y = this.sprite.y;

		if (m == 'left') {
			this.moving = 'left';
			x = this.sprite.x - 32;
		}
		else if (m == 'right') {
			this.moving = 'right';
			x = this.sprite.x + 32;
		}
		else if (m == 'up') {
			this.moving = 'up';
			y = this.sprite.y - 32;
		}
		else if (m == 'down') {
			this.moving = 'down';
			y = this.sprite.y + 32;
		}

		if(this.canPass(x, y)) {
			this.toX = x;
			this.toY = y;
		}
		else {
			this.moving = 'none';
		};
	}

	send(command)
	{
		this.command = command;
	}

	canPass(x,y) {
		return map.getTileWorldXY(x, y) == null;
	}

	isMoveFinished()
	{
		if (this.moving == 'left' && this.sprite.x <= this.toX) {
				return true;
			}

			if (this.moving == 'right' && this.sprite.x >= this.toX) {
				return true;
			}

			if (this.moving == 'up' && this.sprite.y <= this.toY) {
				return true;
			}

			if (this.moving == 'down' && this.sprite.y >= this.toY) {
				return true;
			}

			return false;
	}

	move()
	{
		this.sprite.body.velocity.x = 0;
		this.sprite.body.velocity.y = 0;

		if (this.moving == 'none') {
			this.sprite.animations.stop('walk');
		}
		else {
			this.sprite.animations.play('walk');
		}
		
		if (this.moving == 'left') this.sprite.x -= 4;
		else if (this.moving == 'right') this.sprite.x += 4;
		else if (this.moving == 'up') this.sprite.y -= 4;
		else if (this.moving == 'down') this.sprite.y += 4;		
	}

	update()
	{
		if (this.isMoveFinished()) this.moving = 'none';
	

		if (this.moving == 'none') {

			if (this.command == 'left') {
				this.setMove('left');
				this.command = 'none';
				this.sprite.scale.x = -2;
			}

			if (this.command == 'right') {
				this.setMove('right');
				this.command = 'none';
				world.nextTurn();
				this.sprite.scale.x = 2;
			}

			if (this.command == 'up') {
				this.setMove('up');
				this.command = 'none';
			}

			if (this.command == 'down') {
				this.setMove('down');
				this.command = 'none';
			}
		}

		this.move();

	}
}