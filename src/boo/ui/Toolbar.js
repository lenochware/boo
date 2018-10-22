var Boo = Boo || {};

Boo.ui = {};

Boo.ui.Toolbar = class
{
	add()
	{
		var div = $('<div/>', {
		    class: 'ui toolbar',
		    width: 800,
		});

		div.html('asdasdasd');

		$("#canvas-div").append(div);
	}

}