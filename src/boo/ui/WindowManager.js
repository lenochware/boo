var Boo = Boo || {};
Boo.ui = Boo.ui || {};

Boo.ui.WindowManager = class {

    constructor()
    {
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

    inventory()
    {
        this.window('inventory', 250, 340, this.template('inventory'));
         var item = document.createElement('div');
         $(item).addClass('ui-item')
         .css('background-position','-64px 0px')
         .appendTo("#in1")
         .click(()=>this.popup(null, "Some item", "This is an description of some item", 
             [{label: "Ok", onclick: "wm.closeWindow('popup')"}, {label: 'Test'}]
         ));
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
        $("#ui-toolbar .ui-button").click(toolbar_click);
    }
}