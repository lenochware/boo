var Boo = Boo || {};

Boo.Creature = class
{
	constructor(params)
	{
		this.params = _.extend(currentLevel.monsters[params.family], params);
		this.sprite = null;
		this.target = null;
		this._position = {};
		this.time = 0;
		this.action = {name: 'idle', state: 'done'};
	}

	do(actionName)
	{
		if (this.action && this.action.state != 'done') return;
		if (!this[actionName]) throw `Action '${actionName}' does not exists.`;
		
		var action = {};
		action.name = actionName;
		action.state = "new";
		action.prev = this.action.name;
		action.callback = this[actionName];
		action.args = Array.prototype.slice.call(arguments, 1); 
		action.anim = actionName;
		action.time = 10;
		action.isBlocking = (actionName != 'walk');

		this.action = action;
	}

	attack()
	{
		if (!this.target || !this.canReach(this.target)) {
			console.log('Cannot reach target.');
			return;
		}

		this.target.damage({"monster": this, "strength": this.params.attack});
		wm.message("Attacked " + this.target.params.name + this.target.params.health);
		if (this.target.isDestroyed()) this.target = null;
	}

	damage(attack)
	{
		//this.sprite.tint = 0xff0000;
		this.params.health -= attack.strength;
		this.target = attack.monster;
		if (this.params.health <= 0) this.do('die');
	}

	die()
	{
		this.params.health = 0;
		wm.message(this.params.name + " is death.");
		world.removeMonster(this);
	}

	walk()
	{
		var move = this.action.args;

		if (move[0] == 0 && move[1] == 0) {
			this.action.state = 'done';
			return;			
		}

		if (move[0] < 0) this.sprite.scale.x = -1;
		if (move[0] > 0) this.sprite.scale.x = 1;

		if (!this.canPass(this._position.x + move[0], this._position.y + move[1])) {
			this.action.state = 'done';

			var tile = world.getTileProp(this._position.x + move[0], this._position.y + move[1])

			if (tile.monster)
			{
				this.target = tile.monster;
				this.do('attack');
			}

			return;
		}

		this.setPosition(this._position.x + move[0], this._position.y + move[1], false);
	}

	search()
	{
		wm.message('Searching...');
	}

	idle() {}

	next() {}

	_move()
	{
		var STEP = 4;

		var dx = this.sprite.x - this._position.worldX;
		var dy = this.sprite.y - this._position.worldY;
		
		if (dx > 0) this.sprite.x -= STEP;
		else if (dx < 0) this.sprite.x += STEP;

		if (dy > 0) this.sprite.y -= STEP;
		else if (dy < 0) this.sprite.y += STEP;
	}

  update()
	{
		if (!this.action || this.action.state == 'done') {
			this.sprite.animations.play('idle');
			return;
		}

		if (this.action.name == 'walk') {
			if (this.action.state == 'new') {
				this.sprite.animations.play(this.action.anim);
				this.action.state = 'ongoing';
				this.action.callback.apply(this, this.action.args);
			}

			if (this.action.state == 'ongoing') {
				if (this._isMoveFinished()) {
					this.action.state = 'done';
					this.time += this.action.time;
				}
				else this._move();
			}

		}
		else {
			if (this.action.state == 'new') {
				this.sprite.animations.play(this.action.anim);
				this.action.state = 'ongoing';
				return;
			}
			
			if (this.action.state == 'ongoing' && this.sprite.animations.currentAnim.isFinished) {
				this.action.callback.apply(this, this.action.args);
				this.action.state = 'done';
				this.time += this.action.time;
			}
		}
	}

	canPass(x,y) {
		var tile = world.getTileProp(x, y);
		if (tile.monster) return false;
		return !tile.wall;
	}

	setPosition(x, y, setSprite = true)
	{
		if (!_.isEmpty(this._position)) {
			var tile = world.map.getTile(this._position.x, this._position.y);
			tile.properties.monster = null;			
		}
		tile = world.map.getTile(x, y);
		tile.properties.monster = this;

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
	    //this.sprite = game.add.sprite(0, 0, name);
	    this.sprite = new Phaser.Sprite(game, 0, 0, name);
	    game.add.existing(this.sprite);

			this.setPosition(x, y);
			_.each(currentLevel.sprites[name].animations,
				(anim,key) => this.sprite.animations.add(key, anim.frames, anim.frameRate, anim.loop)
			);
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

	isDestroyed()
	{
		return (this.params.health <= 0);
	}

	canReach(target)
	{
    if (!target) return false;
    if (Math.abs(target._position.x - this._position.x) > 1) return false;
    if (Math.abs(target._position.y - this._position.y) > 1) return false;
    return true;
	}
}
