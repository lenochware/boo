var Boo = Boo || {};

Boo.Item = class
{
  static fromTile(tileIndex)
  {
  	var item = new Boo.Item;
    item.tileIndex = tileIndex;
    var ts = world.getTileset(tileIndex);
    item.id = ts.name + '.' + (tileIndex - ts.firstgid);
    return item;
  }
}