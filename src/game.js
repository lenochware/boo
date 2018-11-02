
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
    world.create();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var player = new Boo.Player({family: 'warrior', x:2, y:2});
    
    world.setPlayer(player);

    var monster = new Boo.Monster({family: 'brute', x:3, y:4});
    world.addMonster(monster);

    monster = new Boo.Monster({family: 'brute', x:3, y:5});
    world.addMonster(monster);

    input.init();
    wm.init();
}

function update()
{
  input.process();
  world.update();
}

function render()
{
  // game.debug.body(sprite);
  //game.debug.text('sprite', 32, 32);
  //game.debug.spriteInfo(world.player.sprite, 32, 32);
}