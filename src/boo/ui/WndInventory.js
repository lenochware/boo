var Boo = Boo || {};
Boo.ui = Boo.ui || {};

Boo.ui.WndInventory = class
{
	constructor(wm, owner)
	{
		this.wm = wm;
		this.owner = owner;
	}

	open()
	{
		this.wm.window('inventory', 250, 340, wm.template('inventory'));
		this.fillItems(this.owner.inventory);
	}

	fillItems(items)
	{
		_.each(items, this.setItem, this);
	}

	setItem(item, index)
	{
		var icon = document.createElement('div');

		$(icon).addClass('ui-item')
		.css('background-position',`${-item.icon.x}px ${-item.icon.y}px`)
		.appendTo("#in"+ (index + 1))
		.click(()=>this.showItemDetail(index));
	}

	showItemDetail(index)
	{
		var item = this.owner.inventory[index];
		
		this.wm.popup(null, item.name(), item.shortDesc(), 
			[{label: "Ok", onclick: "wm.closeWindow('popup')"}, {label: 'Drop', onclick: "wm.inventory.drop("+index+")"}]
		);
		console.log(item.getActions());
	}

	drop(index)
	{
		this.owner.inventoryDrop(index);
		wm.closeWindow('popup');
		wm.closeWindow('inventory');
	}
}