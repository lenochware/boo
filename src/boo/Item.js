var Boo = Boo || {};

Boo.Item = class extends Boo.Entity
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

  actions()
  {
  	return [];
  }


}