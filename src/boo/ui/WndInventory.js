var Boo = Boo || {};
Boo.ui = Boo.ui || {};

Boo.ui.WndInventory = class {

  constructor(wm)
  {
  	this.wm = wm;
  }

	open()
	{
		this.wm.window('inventory', 250, 340, wm.template('inventory'));
		this.fillItems(world.player.inventory);
	}

	fillItems(items)
	{
		_.each(items, this.setItem);
	}

	setItem(item, index)
	{
	   var icon = document.createElement('div');
	   var iconX = -(item.id % 8) * 32;
	   var iconY = -Math.floor(item.id / 8) * 32;

	   $(icon).addClass('ui-item')
	   .css('background-position',iconX+'px '+iconY+'px')
	   .appendTo("#in"+ (index + 1))
	   .click(()=>this.wm.popup(null, "Some item", "This is an description of some item", 
	       [{label: "Ok", onclick: "wm.closeWindow('popup')"}, {label: 'Test'}]
	   ));
	}

}