var Boo = Boo || {};
Boo.ui = Boo.ui || {};

Boo.ui.WindowManager = class
{
	constructor()
	{
		this.marker = null;
		this.inventory = null;

		this.messages = document.createElement('div');
		$(this.messages).addClass('ui-messages')
		.width(game.width)
		.appendTo('#'+game.parent);

		this.footer = document.createElement('div');
		$(this.footer).addClass("ui-footer")
		.width(game.width)
		.appendTo('#'+game.parent);
	}

	load()
	{
		game.load.text('templates/popup', 'assets/ui/templates/popup.html');
		game.load.text('templates/inventory', 'assets/ui/templates/inventory.html');
		game.load.text('templates/toolbar', 'assets/ui/templates/toolbar.html');
	}

	init()
	{
		this.createTileSelector();
		this.inventory = new Boo.ui.WndInventory(this, world.player);
		this.toolbar();
	}

	window(id, width, height, content)
	{
		var over = document.createElement('div');
		$(over).addClass("ui-overlay")
		.click(() => this.closeWindow(id))
		.attr("id", id + "-overlay")
		.appendTo('#'+game.parent);

		var d = document.createElement('div');
		$(d).addClass("ui-window")
		.attr("id", id)
		.width(width)
		.height(height)
		.html(content)
		.appendTo('#'+game.parent).show();//fadeIn(200);
	}

	template(id, data)
	{
		return _.template(game.cache.getText('templates/'+id))(data);
	}

	closeWindow(id)
	{
		$('#' + id).remove();
		$('#' + id + '-overlay').remove();
	}

	popup(icon, title, desc, buttons)
	{
		this.window('popup', 500, 200, 
			this.template('popup', {icon:icon,title:title,desc:desc,buttons:buttons})
		);
	}

  popupMsg(x, y, message, cssClass = '')
  {
    $('#hint01').remove();

    var d = document.createElement('div');
    $(d).addClass("popup-msg " + cssClass)
    .attr("id", "hint01")
    .width(400)
    .css({left:x,top:y})
    .html(message)
    .show()
    .delay(2000)
    .fadeOut()    
    .appendTo('#'+game.parent);
  }

  flashMsg(x, y, message, cssClass = '')
  {
    var d = document.createElement('div');
    $(d).addClass("popup-msg animated fadeout-up " + cssClass)
    .width(400)
    .css({left:x,top:y - 32})
    .html(message)
    .show()
    .delay(1000)
    .queue(function() {
      $(this).remove();
    }) 
    .appendTo('#'+game.parent);
  }

	message(m, cssClass = 'msg')
	{
		$(this.messages).append(`<span class="${cssClass}">${m}</span>`);
		this.messages.scrollTop = this.messages.scrollHeight;
	}

	toolbar()
	{
		$(this.footer)
		.html(this.template('toolbar'))
		.appendTo('#'+game.parent);
		$("#ui-toolbar .ui-button").click(() => wm.inventory.open());
	}

	createTileSelector()
	{
		//  Our painting marker
		this.marker = game.add.graphics();
		this.marker.lineStyle(2, 0x00ff00, 1);
		this.marker.drawRect(0, 0, world.map.tileWidth, world.map.tileHeight);
	}    

	updateMarker()
	{
		var tile = world.map.getTileWorldXY(game.input.activePointer.worldX, game.input.activePointer.worldY);
		if (!tile) return;

		this.marker.x = tile.x * world.map.tileWidth;
		this.marker.y = tile.y * world.map.tileHeight;

		if (game.input.activePointer.leftButton.isDown)
		{
      wm.popupMsg(game.input.mousePointer.x + 30, game.input.mousePointer.y - 30, 
        "You see "+world.getPos(tile.x, tile.y).name().indef()
      );
		}
	}
}