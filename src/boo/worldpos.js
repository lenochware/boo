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

    var item = world.map.getTile(this.x, this.y, 'items');
    this.itemIndex = item? item.index : 0;
  }

  getItem()
  {
  	if (!this.itemIndex) return null;
  	world.map.removeTile(this.x, this.y, 'items');
  	return new Boo.Item(this.itemIndex);
  }

  putItem(item)
  {
  	if (this.itemIndex) {
  		console.log('There is no place.');
  		return false;
  	}

  	world.map.putTile(item.index, this.x, this.y, 'items');
  	this.itemIndex = itemIndex;
  	return true;
  }
}