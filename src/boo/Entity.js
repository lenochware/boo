var Boo = Boo || {};

Boo.Entity = class
{
  constructor()
  {
    this.PROPERTY_PATH = 'items';
  }

  getProperty(propId)
  {
    var prop = world.currentLevel[this.PROPERTY_PATH][this.id][propId];
    if (!prop) throw `Missing property ${this.id+'.'+propId}.`;
    return prop; 
  }

  is(tag)
  {
    return (this.getProperty("tags").indexOf(tag) != -1);
  }

  name()
  {
  	return this.getProperty("name");
  }

  shortDesc()
  {
  	return this.getProperty("desc");
  }
}