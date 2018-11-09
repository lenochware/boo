var Boo = Boo || {};

Boo.Movable = class extends Boo.Entity
{
	constructor(id, category)
	{
		super(id, category);
		this.sprite = null;
		this.target = null;
		this.pos = new Boo.WorldPos();
		this.time = 0;
		this.action = {name: 'idle', state: 'done'};
	}

	setPosition(x, y, setSprite = true)
	{
		if (this.pos.getMonster() === this) {
			this.pos.setMonster(null);
		}

		this.pos.set(x, y).setMonster(this);

		if (setSprite) {
			this.sprite.x = this.pos.px;
			this.sprite.y = this.pos.py;
		}
	}

	setSprite(name, x, y)
	{
		if (!this.sprite) {
			//this.sprite = game.add.sprite(0, 0, name);
			this.sprite = new Phaser.Sprite(game, 0, 0, name);
			game.add.existing(this.sprite);

			this.setPosition(x, y);
			_.each(world.currentLevel.sprites[name].animations,
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
		return (this.sprite.x == this.pos.px && this.sprite.y == this.pos.py);
	}

	_move()
	{
		var STEP = 4;

		var dx = this.sprite.x - this.pos.px;
		var dy = this.sprite.y - this.pos.py;
		
		if (dx > 0) this.sprite.x -= STEP;
		else if (dx < 0) this.sprite.x += STEP;

		if (dy > 0) this.sprite.y -= STEP;
		else if (dy < 0) this.sprite.y += STEP;
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

		var npos = this.pos.add(move[0], move[1]);

		if (!this.canPass(npos)) {
			this.action.state = 'done';

			if (npos.getMonster())
			{
				this.target = npos.getMonster();
				this.do('attack');
			}

			return;
		}

		this.setPosition(npos.x, npos.y, false);
	}

	do(actionName, args)
	{
		if (this.action && this.action.state != 'done') return;
		if (!this[actionName]) throw `Action '${actionName}' does not exists.`;
		
		var action = {};
		action.name = actionName;
		action.state = "new";
		action.prev = this.action.name;
		action.callback = this[actionName];
		action.args = args;
		action.anim = actionName;
		action.time = 10;
		action.isBlocking = (actionName != 'walk');

		this.action = action;
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
					this.onStep();
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

	canPass(pos)
	{
		if (pos.getMonster()) return false;
		return !pos.is('wall');
	}

	canReach(target)
	{
		if (!target) return false;
		if (Math.abs(target.pos.x - this.pos.x) > 1) return false;
		if (Math.abs(target.pos.y - this.pos.y) > 1) return false;
		return true;
	}	

	onStep() {}		
}