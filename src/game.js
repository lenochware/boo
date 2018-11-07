
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

	var player = new Boo.Player('warrior');
	
	world.setPlayer(player, 2, 2);

	var monster = new Boo.Monster('brute');
	world.addMonster(monster, 3, 4);

	monster = new Boo.Monster('brute');
	world.addMonster(monster, 3, 5);

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