var Boo = Boo || {};

Boo.Player = class extends Boo.Creature
{
	constructor(id)
	{
		super(id);
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

	inventoryDrop(index)
	{
		var item = this.inventoryGet(index);
		if (!item) return;
		var ok = this.pos.putItem(item);
		if (!ok) {
			wm.message("There is no room.");
			this.inventoryPut(item);
		}
	}

	eat(index)
	{
		console.log('eat',index);
		var item = this.inventoryGet(index);
		if (!item) return;		
		wm.message(`You eat ${item.name()}.`);
	}

	onStep() {
		var item = this.pos.takeItem();
		if (!item) return;

		if (this.inventoryPut(item)) {
			wm.message(`You have ${item.name()}.`);
		}
		else {
			wm.message("You have no room in inventory.");
			this.pos.putItem(item);
		}
	}
}