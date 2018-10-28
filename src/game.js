
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game-container', { preload: preload, create: create, update: update, render: render }, false, false/*antialias*/);

var wm = new Boo.ui.WindowManager;
var input = new Boo.ui.InputManager;
var world = new Boo.World;

function preload() {
    wm.load();
    world.loadLevel(Boo.levels.level1);
}

function create()
{
    world.map = game.add.tilemap('map');
    world.map.addTilesetImage('tiles1');
    world.map.createLayer('floor').resizeWorld();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //game.time.advancedTiming = true;
   // game.renderer.renderSession.roundPixels = true;
   //game.forceSingleUpdate = true;
    //game.scale.pageAlignHorizontally = true;

   var tile = world.map.getTile(3,3);
   tile.properties.test = 'test';

    //  Create our tile selector at the top of the screen
    //game.input.addMoveCallback(updateMarker, this);


    var player = new Boo.Player({family: 'warrior', x:2, y:2});
    
    world.setPlayer(player);

    var monster = new Boo.Monster({family: 'brute', x:3, y:4});
    world.addMonster(monster);

    monster = new Boo.Monster({family: 'brute', x:3, y:5});
    world.addMonster(monster);

    input.init();
    wm.init();

    //game.world.scale.setTo(2, 2);
    //game.camera.scale.setTo(2,2);
}

function update()
{
  //input.process();
  world.update();
  // game.camera.y +=4;
  // console.log(game.camera.y);
}

function render()
{
   // game.debug.body(sprite);
  //game.debug.text('sprite', 32, 32);
  //game.debug.spriteInfo(world.player.sprite, 32, 32);
}