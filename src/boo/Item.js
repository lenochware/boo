var Boo = Boo || {};

Boo.Item = class extends Boo.Entity
{
	constructor(id)
	{
		super(id, 'items');
	}

	static createFromTile(tileIndex)
	{
		var item = new Boo.Item('nothing');
		item.tileIndex = tileIndex;
		var ts = world.getTileset(tileIndex);
		item.index = tileIndex - ts.firstgid;
		item.icon = new Phaser.Point((item.index % 8) * 32, Math.floor(item.index / 8) * 32);
		item.id = world.currentLevel.tilesets.items.tiles[item.index];
		return item;
	}

	getActions()
	{
		var actions = ['drop'];
		
		if (this.isDestroyed()) {
			return actions;
		}

		if (this.is('food')) actions.push('eat');
		if (this.is('equipment')) actions.push('equip');
		if (this.is('tool')) actions.push('use');
		if (this.is('weapon')) actions.push('attack');

		return actions;
	}
}