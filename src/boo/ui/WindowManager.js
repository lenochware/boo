var Boo = Boo || {};

Boo.ui = {};

Boo.ui.WindowManager = class {

    constructor()
    {
        this.templates = {};
        this.afterLoad = _.noop;
    }

    load()
    {
        var d1 = $.get("templates/popup.html", (data) => this.templates.popup = data);
        var d2 = $.get("templates/inventory.html", (data) => this.templates.inventory = data);        
        var d3 = $.get("templates/toolbar.html", (data) => this.templates.toolbar = data);
        $.when(d1, d2, d3).done(this.afterLoad)
    }

    window(id, width, height, content)
    {
      var over = document.createElement('div');
      $(over).addClass("ui-overlay")
      .click(() => this.closeWindow(id))
      .attr("id", id + "-overlay")
      .appendTo($("#container"));

      var d = document.createElement('div');
      $(d).addClass("ui-window")
      .attr("id", id)
      .width(width)
      .height(height)
      .html(content)
      .appendTo($("#container")).fadeIn(200);
    }

    template(id, data)
    {
        return _.template(this.templates[id])(data);
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

    toolbar(id)
    {
        $('#' + id).html(this.template('toolbar'));
        $("#ui-toolbar .ui-button").click(toolbar_click);
    }
}