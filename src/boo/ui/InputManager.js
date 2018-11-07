var Boo = Boo || {};
Boo.ui = Boo.ui || {};

Boo.ui.InputManager = class
{
	constructor()
	{
		this.currentKey = null;
		this.dragPoint = new Phaser.Point;
	}

	init()
	{
		//game.input.mouse.onMouseMove =  this.onMouseMove; 
		game.input.addMoveCallback(this.onMove, this);

		document.addEventListener('keydown', this.onKeyDown.bind(this));
		document.addEventListener('keyup', this.onKeyUp.bind(this));
	}

	onKeyDown(e)
	{    
		this.currentKey = e;
		e.preventDefault();
	}

	onKeyUp(e)
	{
		this.currentKey = null;
	}


	process()
	{
		this.processKeys();
		//this.processMouse();
	}

	processKeys()
	{
		if (!this.currentKey) return;

		switch (this.currentKey.code)
		{
			case 'ArrowLeft': world.player.do('walk', [-1, 0]); break;
			case 'ArrowRight': world.player.do('walk', [1, 0]); break;
			case 'ArrowUp': world.player.do('walk', [0, -1]);  break;
			case 'ArrowDown': world.player.do('walk', [0, 1]); break;
			case 'Numpad4': world.player.do('walk', [-1, 0]);  break;
			case 'Numpad6': world.player.do('walk', [1, 0]);   break;
			case 'Numpad8': world.player.do('walk', [0, -1]);  break;
			case 'Numpad2': world.player.do('walk', [0, 1]);   break;
			case 'Numpad7': world.player.do('walk', [-1, -1]); break;
			case 'Numpad9': world.player.do('walk', [1, -1]);  break;
			case 'Numpad1': world.player.do('walk', [-1, 1]);  break;
			case 'Numpad3': world.player.do('walk', [1, 1]);   break;

			case 'KeyS':
				world.player.do('search');
				break;
		}
	}
	
	onMove(pointer, x, y, click)
	{
		if (click) {
			game.camera.unfollow();
			this.dragPoint.set(game.camera.x + x, game.camera.y + y);
		}

		if (pointer.middleButton.isDown) {
			game.camera.x = this.dragPoint.x - x;
			game.camera.y = this.dragPoint.y - y;
		}

		wm.updateMarker();
	}  

	processMouse()
	{

	}


}