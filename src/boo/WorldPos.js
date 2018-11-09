var Boo = Boo || {};

Boo.WorldPos = class
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	getTile(layer = 'floor')
	{
		return world.map.getTile(this.x, this.y, layer);
	}

	is(tag)
	{
		if (tag == 'wall') return (this.getTile().index == 17);
		if (tag == 'floor') return (this.getTile().index != 17);
		return false;
	}

	getMonster()
	{
		return this.getTile().properties.monster;
	}

	getItem()
	{
		var tile = this.getTile('items');
		if (!tile) return null;
		world.map.removeTile(this.x, this.y, 'items');
		return Boo.Item.createFromTile(tile.index);
	}

	putItem(item)
	{
		var tile = this.getTile('items');
		if (tile) {
			console.log('There is no place.');
			return false;
		}

		world.map.putTile(item.tileIndex, this.x, this.y, 'items');
		return true;
	}
}