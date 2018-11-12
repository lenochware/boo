var Boo = Boo || {};

Boo.WorldPos = class extends Boo.Entity
{
	constructor(x, y)
	{
		super('unknown', 'tiles');
		this.set(x, y);
	}

	getTile(layer = 'floor')
	{
		return world.map.getTile(this.x, this.y, layer);
	}

	set(x, y)
	{
		this.x = x || 0;
		this.y = y || ( (y !== 0) ? this.x : 0 );

		this.px = this.x * world.map.tileWidth + world.map.tileWidth / 2;
		this.py = this.y * world.map.tileHeight + world.map.tileHeight / 2;

		this.id = world.currentLevel.tilesets.tiles1.tiles[this.getTile().index - world.tilesets.tiles1.firstgid];

		return this;
	}

	add(x, y)
	{
		return new Boo.WorldPos(this.x + x, this.y + y);
	}

	copyFrom(src)
	{
		return this.set(src.x, src.y);
	}

	name()
	{
		if (this.getMonster()) return this.getMonster().name();
		if (this.getItem()) return this.getItem().name();
		return super.name();
	}

	getMonster()
	{
		return this.getTile().properties.monster;
	}

	setMonster(m)
	{
		this.getTile().properties.monster = m;
	}

	getItem()
	{
		var tile = this.getTile('items');
		if (!tile) return null;
		return Boo.Item.createFromTile(tile.index);
	}

	takeItem()
	{
		var tile = this.getTile('items');
		if (!tile) return null;
		world.map.removeTile(this.x, this.y, 'items');
		return Boo.Item.createFromTile(tile.index);		
	};

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