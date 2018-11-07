var Boo = Boo || {};

Boo.WorldPos = class
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;

		var floor = world.map.getTile(x, y, 'floor');
		this.family = (floor.index == 17)? 'wall' : 'floor';
		this.monster = floor.properties.monster;

		var itemTile = world.map.getTile(this.x, this.y, 'items');
		this.itemTileIndex = itemTile? itemTile.index : 0;
	}

	getItem()
	{
		if (!this.itemTileIndex) return null;
		world.map.removeTile(this.x, this.y, 'items');

		return Boo.Item.fromTile(this.itemTileIndex);
	}

	putItem(item)
	{
		if (this.itemTileIndex) {
			console.log('There is no place.');
			return false;
		}

		world.map.putTile(item.tileIndex, this.x, this.y, 'items');
		this.itemTileIndex = item.tileIndex;
		return true;
	}
}