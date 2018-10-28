var Boo = Boo || {};
Boo.ui = Boo.ui || {};

Boo.ui.InputManager = class {

  constructor()
  {
    this.cursors = null;
  }

  init()
  {
    this.cursors = game.input.keyboard.createCursorKeys();
    //game.input.mouse.onMouseMove =  this.onMouseMove; 
    game.input.addMoveCallback(this.onMove, this);  
  }

  process()
  {
    this.processKeys();
//    this.processMouse();
  }

  processKeys()
  {
    if (this.cursors.left.isDown) {
      world.player.do('walk', -1, 0);
    }
    else if (this.cursors.right.isDown) {
      world.player.do('walk', 1, 0);
    }
    else if (this.cursors.up.isDown) {
      world.player.do('walk', 0, -1);
    }
    else if (this.cursors.down.isDown) {
      world.player.do('walk', 0, 1);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
      world.player.do('search');
    }

    //if (game.input.keyboard.lastKey) console.log(game.input.keyboard.lastKey.keyCode);
  }
  
  onMove(pointer, x, y, click)
  {
    if (pointer.middleButton.isDown) {
      game.camera.x = x;
      game.camera.y = y;
    }
   // console.log(click);
    updateMarker();
  }  

  processMouse()
  {

  }


}