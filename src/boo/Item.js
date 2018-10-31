var Boo = Boo || {};

Boo.Item = class
{
  static fromTile(tileIndex)
  {
  	var item = new Boo.Item;
    item.tileIndex = tileIndex;
    var ts = world.getTileset(tileIndex);
    item.id = tileIndex - ts.firstgid;
    item.icon = new Phaser.Point((item.id % 8) * 32, Math.floor(item.id / 8) * 32);
    return item;
  }

  name()
  {
  	return "Some item";
  }

  shortDesc()
  {
  	return "This is an description of some item.";
  }

  actions()
  {
  	return [];
  }


}