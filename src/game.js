
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'canvas-div', { preload: preload, create: create, update: update, render: render }, false, false/*antialias*/);

function preload() {

    game.load.tilemap('map', 'assets/tilemaps/maps/test_level.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles1', 'assets/tilemaps/tiles/tiles1_big.png');
    game.load.spritesheet('brute', 'assets/sprites/brute_big.png', 24, 32);

}

var cursors;
var layer;
var marker;

var world = new Boo.World;

function create()
{
    world.map = game.add.tilemap('map');

    world.map.addTilesetImage('tiles1');

//    world.map.setCollisionBetween(1, 12);

    layer = world.map.createLayer('floor');

    // layer.setScale(2,2);
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


    cursors = game.input.keyboard.createCursorKeys();

    var player = new Boo.Player({family: 'brute', x:2, y:2});
    
    world.setPlayer(player);

    var monster = new Boo.Monster({family: 'brute', x:3, y:4});
    world.addMonster(monster);

    monster = new Boo.Monster({family: 'brute', x:3, y:5});
    world.addMonster(monster);

    //game.world.scale.setTo(2, 2);
    //game.camera.scale.setTo(2,2);
}

function update()
{
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
  //game.debug.spriteInfo(world.player.sprite, 32, 32);
}


function createTileSelector() {
    //  Our painting marker
    marker = game.add.graphics();
    marker.lineStyle(2, 0x00ff00, 1);
    marker.drawRect(0, 0, world.map.tileWidth, world.map.tileHeight);
}

function updateMarker() {

    marker.x = layer.getTileX(game.input.activePointer.worldX) * world.map.tileWidth;
    marker.y = layer.getTileY(game.input.activePointer.worldY) * world.map.tileHeight;

    if (game.input.mousePointer.isDown)
    {
      console.log(world.map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y)));
      //world.map.putTile(/*currentTile*/0, layer.getTileX(marker.x), layer.getTileY(marker.y), layer);
        // map.fill(currentTile, layer.getTileX(marker.x), layer.getTileY(marker.y), 4, 4, layer);
    }

}