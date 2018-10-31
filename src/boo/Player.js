var Boo = Boo || {};

Boo.Player = class extends Boo.Creature
{
	constructor(params)
	{
		super(params);
		this.inventory = [];
		this.maxInventory = 20;
	}

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

	inventoryPut(item)
	{
		if (this.inventory.length >= this.maxInventory) return false;
		this.inventory.push(item);
		return true;
	}

	inventoryGet(index)
	{
		if (this.inventory.length <= index) return null;
		var removed = this.inventory.splice(index, 1);
		return removed[0];
	}

	onStep() {
		var pos = world.getPos(this._position.x, this._position.y);
		var item = pos.getItem();
		if (!item) return;

		if (this.inventoryPut(item)) {
			wm.message(`You have ${item.id}.`);
		}
		else {
			wm.message("You have no room in inventory.");
			pos.putItem(item);
		}
	}
}