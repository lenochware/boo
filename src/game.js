
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'canvas-div', { preload: preload, create: create, update: update, render: render }, false, false/*antialias*/);

function preload() {

    game.load.tilemap('map', 'assets/tilemaps/maps/features_test.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
    game.load.image('walls_1x2', 'assets/tilemaps/tiles/walls_1x2.png');
    game.load.image('tiles2', 'assets/tilemaps/tiles/tiles2.png');

    game.load.image('phaser', 'assets/sprites/arrow.png');
    game.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);
    game.load.spritesheet('brute', 'assets/sprites/brute.png', 12, 16);

}

var cursors;
var coins;

var layer;
var marker;

var world = new Boo.World;

function create()
{
    world.map = game.add.tilemap('map');

    world.map.addTilesetImage('ground_1x1');
    world.map.addTilesetImage('walls_1x2');
    world.map.addTilesetImage('tiles2');

    world.map.setCollisionBetween(1, 12);

    layer = world.map.createLayer('Tile Layer 1');

    layer.resizeWorld();

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //game.time.advancedTiming = true;
   // game.renderer.renderSession.roundPixels = true;
   //game.forceSingleUpdate = true;

   var tile = world.map.getTile(3,3);
   tile.properties.test = 'test';

    //  Create our tile selector at the top of the screen
    createTileSelector();
    game.input.addMoveCallback(updateMarker, this);

    //  Here we create our coins group
    coins = game.add.group();
    coins.enableBody = true;

    //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
    world.map.createFromObjects('Object Layer 1', 34, 'coin', 0, true, false, coins);

    //  Add animations to all of the coin sprites
    coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    coins.callAll('animations.play', 'animations', 'spin');

    cursors = game.input.keyboard.createCursorKeys();

    var player = new Boo.Player({family: 'brute', x:256, y:64});
    
    world.setPlayer(player);

    var monster = new Boo.Monster({family: 'brute', x:384, y:96});
    world.addMonster(monster);

    monster = new Boo.Monster({family: 'brute', x:416, y:128});
    world.addMonster(monster);

}

function update()
{
  //game.physics.arcade.collide(player.sprite, layer, function() { player.moving = 'none';});
 //game.physics.arcade.overlap(player.sprite, layer, function() { player.moving = 'none'; console.log('aaa');});
  game.physics.arcade.overlap(world.player.sprite, coins, collectCoin, null, this);

  if (cursors.left.isDown) {
    world.player.send({command:'move', x:-1, y:0});
  }
  else if (cursors.right.isDown) {
    world.player.send({command:'move', x:1, y:0});
  }
  else if (cursors.up.isDown) {
    world.player.send({command:'move', x:0, y:-1});
  }
  else if (cursors.down.isDown) {
    world.player.send({command:'move', x:0, y:1});
  }
  else {
  	world.player.send({command: null});
  }

  world.update();
}


function collectCoin(player, coin)
{
  coin.kill();
}

function render()
{
   // game.debug.body(sprite);
  //game.debug.text('sprite', 32, 32);
  //game.debug.spriteInfo(sprite, 32, 32);
}


function createTileSelector() {
    //  Our painting marker
    marker = game.add.graphics();
    marker.lineStyle(2, 0x00ff00, 1);
    marker.drawRect(0, 0, 32, 32);
}

function updateMarker() {

    marker.x = layer.getTileX(game.input.activePointer.worldX) * 32;
    marker.y = layer.getTileY(game.input.activePointer.worldY) * 32;

    if (game.input.mousePointer.isDown)
    {
      console.log(world.map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y)));
      //world.map.putTile(/*currentTile*/0, layer.getTileX(marker.x), layer.getTileY(marker.y), layer);
        // map.fill(currentTile, layer.getTileX(marker.x), layer.getTileY(marker.y), 4, 4, layer);
    }

}