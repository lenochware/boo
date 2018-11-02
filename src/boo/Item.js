var Boo = Boo || {};

Boo.Item = class
{
  static fromTile(tileIndex)
  {
  	var item = new Boo.Item;
    item.tileIndex = tileIndex;
    var ts = world.getTileset(tileIndex);
    item.index = tileIndex - ts.firstgid;
    item.icon = new Phaser.Point((item.index % 8) * 32, Math.floor(item.index / 8) * 32);
    item.id = world.currentLevel.tilesets.items.tiles[item.index];
    return item;
  }

  getProperty(propId)
  {
    var prop = world.currentLevel.items[this.id][propId];
    if (!prop) throw `Missing property ${this.id+'.'+propId}.`;
    return prop; 
  }

  name()
  {
  	return this.getProperty("name");
  }

  shortDesc()
  {
  	return this.getProperty("desc");
  }

  actions()
  {
  	return [];
  }


}