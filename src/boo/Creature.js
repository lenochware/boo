var Boo = Boo || {};

Boo.Creature = class extends Boo.Movable
{
	constructor(id)
	{
		super(id, 'monsters');
		this.health = this.getProperty('health') || 10;		
	}

	attack()
	{
		if (!this.target || !this.canReach(this.target)) {
			console.log('Cannot reach target.');
			return;
		}

		this.target.damage({"monster": this, "strength": this.getProperty('attack')});

		if (this.isPlayer()) {
			wm.message(`You hit ${this.target.name()}.`);
		}
		else {
			wm.message(this.name() + " hits " + this.target.name() + ".");
		}

		wm.flashMsg(this.target.pos.px, this.target.pos.py, '-1', "msg-danger");

		if (this.target.isDestroyed()) this.target = null;
	}

	damage(attack)
	{
		//this.sprite.tint = 0xff0000;
		this.health -= attack.strength;
		this.target = attack.monster;
		if (this.health <= 0) this.do('die');
	}

	die()
	{
		if (this.isPlayer()) {
			wm.message("You die.", "msg msg-danger");
		}
		else {
			wm.message(`You defeated ${this.name()}.`, "msg msg-hilite");
		}

		this.health = 0;
		world.removeMonster(this);
	}

	search()
	{
		wm.message('Searching...');
	}

	idle() {}

	next() {}

	isPlayer()
	{
		return false;
	}

	isDestroyed()
	{
		return (this.health <= 0);
	}	
}