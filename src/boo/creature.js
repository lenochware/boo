var Boo = Boo || {};

Boo.Creature = class
{
	constructor(params)
	{
		this.params = _.extend(currentLevel.monsters[params.family], params);
		this.sprite = null;
		this.target = null;
		this._visible = false;
		this.state = 'idle';
		this._position = {};
		this.command = {command: null};
	}

	send(command)
	{
		this.command = command || {command: null};
		//if (!this.command.hasOwnProperty(myProp))
	}

	canPass(x,y) {
		var tile = world.map.getTile(x, y);
		if (tile.properties && tile.properties.monster) {

			//Attack anything which you hit to. TODO: Better logic not in canPass.
			this.target = tile.properties.monster; 
			tile.properties.monster.target = this;

			return false;
		}

		return world.map.getTile(x, y).index != 17;
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
	    this.sprite = game.add.sprite(0, 0, name);
			this.setPosition(x, y);
			_.each(currentLevel.sprites[name].animations,
				(anim,key) => this.sprite.animations.add(key, anim.frames, anim.frameRate, true)
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

	_move()
	{
		if (this.state == 'moving') {
			this.sprite.animations.play('walk');
		}
		else {
			//var paused = this.sprite.animations.currentAnim? this.sprite.animations.currentAnim.isPlaying : null;
			if (this.sprite.animations.currentAnim.isPlaying) {
				this.sprite.animations.stop();
				this.sprite.animations.currentAnim.frame = 0;
				//console.log('stop ');
			}
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

	attack(enemy)
	{
		enemy.wound({"monster": this, "strength": 1});
		if (enemy.isDestroyed()) this.target = null;
		console.log("Attacked " + enemy.params.name);
	}

	wound(attack)
	{
		this.params.health -= attack.strength;
		if (this.params.health <= 0) this.death();
		this.target = attack.monster;
	}

	death()
	{
		console.log(this.params.name + " is death.");
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

  update()
	{
		if (this.state == 'moving' && this._isMoveFinished()) this.state = 'idle';

		if (this.command.command == 'move' && this.state == 'idle') {
			if (this.canPass(this._position.x + this.command.x, this._position.y + this.command.y)) {
				this.state = 'moving';
				this.setPosition(this._position.x + this.command.x, this._position.y + this.command.y, false);
				this.onNextTurn();
			}

			if (this.command.x < 0) this.sprite.scale.x = -1;
			if (this.command.x > 0) this.sprite.scale.x = 1;
		}

		if (this.command.command == 'attack' &&  this.state == 'idle' && this.canReach(this.target)) {
			this.state = 'attacking';
			this.attack(this.target);
			this.onNextTurn();
			game.time.events.add(500, () => this.state = 'idle');
		}

		this._move();
		this.send({command: null});
	}	
}