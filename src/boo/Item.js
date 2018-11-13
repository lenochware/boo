var Boo = Boo || {};

Boo.Item = class extends Boo.Entity
{
	constructor(id)
	{
		super(id, 'items');
		this.health = this.getProperty('health') || 10;		
	}

	static createFromTile(tileIndex)
	{
		var item = new Boo.Item('nothing');
		item.tileIndex = tileIndex;
		var ts = world.getTileset(tileIndex);
		item.index = tileIndex - ts.firstgid;
		item.id = world.currentLevel.tilesets.items.tiles[item.index];
		return item;
	}

	isDestroyed()
	{
		return (this.health <= 0);
	}

	getIcon()
	{
		var icon = document.createElement('div');
		var pos = new Phaser.Point((this.index % 8) * 32, Math.floor(this.index / 8) * 32);

		return $(icon).addClass('ui-item')
			.css('background-position',`${-pos.x}px ${-pos.y}px`);
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