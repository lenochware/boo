var Boo = Boo || {};

Boo.Entity = class
{
	constructor(id, category)
	{
		this.id = id;
		this.category = category;
	}

	getProperty(propId)
	{
		try {
			var prop = world.currentLevel[this.category][this.id][propId];
		}
		catch(err) {
			return `missing:${this.category+'.'+this.id+'.'+propId}.`;
		}
		
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