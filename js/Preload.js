var TankGame = TankGame || {};

TankGame.Preload = function(){};

var flagCount = 273; // jaamaina arii ieksh to menu.js

TankGame.Preload.prototype = {
  preload: function() {
    this.game.stage.disableVisibilityChange = true;

    //Parāda logo un uzliek tekstu
    this.preloadBar = this.add.sprite(centerX, centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(2);

    //Visi logo
    this.logo_reinards = this.add.sprite(12, gameHeight-10, 'reinards_logo');
    this.logo_reinards.anchor.setTo(0,1);
    this.logo_reinards.scale.setTo(0.4);

    this.logo_niks = this.add.sprite(105, gameHeight-10, 'niks_logo');
    this.logo_niks.anchor.setTo(0,1);
    this.logo_niks.scale.setTo(0.4);

    this.logo_html5 = this.add.sprite(195, gameHeight-10, 'html5_logo');
    this.logo_html5.anchor.setTo(0,1);
    this.logo_html5.scale.setTo(0.7);

    this.logo_phaser = this.add.sprite(360, gameHeight-10, 'phaser_logo');
    this.logo_phaser.anchor.setTo(1,1);
    // this.logo_phaser.scale.setTo(0.8);

    // this.progress = this.game.add.bitmapText(400, 350, 'myFont3', 'Files loaded: ', 20)
    // this.progress.align = 'center';
    // this.progress.x = this.game.width / 2 - this.progress.textWidth / 2 -25;

    this.hint = this.game.add.bitmapText(400, 500, 'myFont3', "Game not loading? We don't even use cookies! :|", 20)
    this.hint.align = 'center';
    this.hint.x = this.game.width / 2 - this.hint.textWidth / 2;

    this.author = this.game.add.bitmapText(400, 550, 'myFont3', 'Made by Niks and Reinards 2016', 20)
    this.author.align = 'center';
    this.author.x = this.game.width / 2 - this.author.textWidth / 2;

    this.load.setPreloadSprite(this.preloadBar);
    // this.game.load.onFileComplete.add(this.fileComplete, this);



    //load game assets

    //Units
    this.load.spritesheet('tank_tex', 'assets/images/tank.png', 55, 35, 2);
    this.load.spritesheet('tank_tex_blue', 'assets/images/tank_blue.png', 55, 35, 2);

    this.load.spritesheet('tank2_tex', 'assets/images/tank2.png', 60, 40, 2);
    this.load.spritesheet('tank2_tex_blue', 'assets/images/tank2_blue.png', 60, 40, 2);

    this.load.image('plane_tex', 'assets/images/plane.png');
    this.load.image('plane_tex_blue', 'assets/images/plane_blue.png');    

    this.load.spritesheet('pickup_tex', 'assets/images/pickup_green.png', 50, 30, 2);
    this.load.spritesheet('pickup_tex_blue', 'assets/images/pickup_blue.png', 50, 30, 2);

    this.load.spritesheet('gunman_walk', 'assets/images/gunman_walk.png', 40, 40, 2);
    this.load.image('gunman_shoot', 'assets/images/gunman_shoot.png');

    this.load.spritesheet('gunman_walk_blue', 'assets/images/gunman_walk_blue.png', 40, 40, 2);    
    this.load.image('gunman_shoot_blue', 'assets/images/gunman_shoot_blue.png');

    this.load.spritesheet('minecat', 'assets/images/minecat.png', 40, 40, 2);
    this.load.spritesheet('minecat_blue', 'assets/images/minecat_blue.png', 40, 40, 2);

    this.load.spritesheet('ninja_walk', 'assets/images/ninja_walk.png', 40, 40, 2);
    this.load.spritesheet('ninja_walk_blue', 'assets/images/ninja_walk_blue.png', 40, 40, 2);

    this.load.spritesheet('sniper_walk', 'assets/images/sniper_green_walk.png', 40, 40, 2);
    this.load.spritesheet('sniper_shoot', 'assets/images/sniper_green_shoot.png', 40, 40, 2);
    this.load.spritesheet('sniper_walk_blue', 'assets/images/sniper_blue_walk.png', 40, 40, 2);
    this.load.spritesheet('sniper_shoot_blue', 'assets/images/sniper_blue_shoot.png', 40, 40, 2);

    this.load.spritesheet('heli_tex_green', 'assets/images/heli_green.png', 60, 60, 2);
    this.load.spritesheet('heli_tex_blue', 'assets/images/heli_blue.png', 60, 60, 2);

    this.load.spritesheet('cat_walk', 'assets/images/cat.png', 30, 30, 2);
    this.load.spritesheet('angel', 'assets/images/angel.png', 40, 40);

    //GUI
    this.load.image('play_btn', 'assets/images/play.png');
    this.load.image('play_btn_hover', 'assets/images/play_hover.png');
    this.load.image('back_btn', 'assets/images/back.png');
    this.load.image('back_btn_hover', 'assets/images/back_hover.png');

    this.load.image('left_btn','assets/images/btn_left.png');
    this.load.image('right_btn','assets/images/btn_right.png');
    this.load.image('left_btn_hover','assets/images/btn_left_hover.png');
    this.load.image('right_btn_hover','assets/images/btn_right_hover.png');

    this.load.image('menuBtn','assets/images/menuBtn.png');
    this.load.image('restartBtn','assets/images/restartBtn.png');


    for(var i = 0; i<flagCount ; i++){
        this.load.image("flag_" + i,"assets/images/flags/flag_" + i + ".png");
    }

    this.load.image('particles_on', 'assets/images/particles_on.png');
    this.load.image('particles_off', 'assets/images/particles_off.png');
    this.load.image('sounds_on', 'assets/images/sounds_on.png');
    this.load.image('sounds_off', 'assets/images/sounds_off.png');
    this.load.image('music_on', 'assets/images/music_on.png');
    this.load.image('music_off', 'assets/images/music_off.png');
    this.load.image('fullscreen_on', 'assets/images/fullscreen_on.png');
    this.load.image('fullscreen_off', 'assets/images/fullscreen_off.png');
    this.load.image('obstacles_on', 'assets/images/obstacles_on.png');
    this.load.image('obstacles_off', 'assets/images/obstacles_off.png');

    this.load.image('howtoplay_btn', 'assets/images/howtoplay.png');
    this.load.image('howtoplay_btn_hover', 'assets/images/howtoplay_hover.png');

    this.load.image('coin', 'assets/images/coin.png');
    this.load.image('heart', 'assets/images/heart.png');

    this.load.image('card1b', 'assets/images/card1b.png');
    this.load.image('card2b', 'assets/images/card2b.png');
    this.load.image('card3b', 'assets/images/card3b.png');
    this.load.image('card4b', 'assets/images/card4b.png');
    this.load.image('card5b', 'assets/images/card5b.png');
    this.load.image('card6b', 'assets/images/card6b.png');
    this.load.image('card7b', 'assets/images/card7b.png');
    this.load.image('card8b', 'assets/images/card8b.png');
    this.load.image('card9b', 'assets/images/card9b.png');

    this.load.image('card1', 'assets/images/card1.png');
    this.load.image('card2', 'assets/images/card2.png');
    this.load.image('card3', 'assets/images/card3.png');
    this.load.image('card4', 'assets/images/card4.png');
    this.load.image('card5', 'assets/images/card5.png');
    this.load.image('card6', 'assets/images/card6.png');
    this.load.image('card7', 'assets/images/card7.png');
    this.load.image('card8', 'assets/images/card8.png');
    this.load.image('card9', 'assets/images/card9.png');

    //Map
    this.load.image('base', 'assets/images/base.png');
    this.load.image('baseCircle', 'assets/images/basecircle.png');
    this.load.image('border', 'assets/images/border.png');  
    this.load.image('grass_tex', 'assets/images/grass.png');
    this.load.image('sand_tex', 'assets/images/sand.png');
    this.load.image('snow_tex', 'assets/images/snow.png');
    this.load.image('swamp_tex', 'assets/images/swamp.png');
    this.load.image('city_tex', 'assets/images/city.png');
    this.load.image('grass_tex_selected', 'assets/images/grassSelected.png');

    this.load.image('tree1', 'assets/images/tree1.png');
    this.load.image('tree2', 'assets/images/tree2.png');
    this.load.image('tree3', 'assets/images/tree3.png');
    this.load.image('tree4', 'assets/images/tree4.png');
    this.load.image('tree5', 'assets/images/tree5.png');

    this.load.image('town1', 'assets/images/citystuff/town1.png');
    this.load.image('town2', 'assets/images/citystuff/town2.png');
    this.load.image('town3', 'assets/images/citystuff/town3.png');
    this.load.image('town4', 'assets/images/citystuff/town4.png');
    this.load.image('town5', 'assets/images/citystuff/town5.png');
    this.load.image('town6', 'assets/images/citystuff/town6.png');
    this.load.image('town7', 'assets/images/citystuff/town7.png');
    this.load.image('town8', 'assets/images/citystuff/town8.png');
    this.load.image('town9', 'assets/images/citystuff/town9.png');
    this.load.image('town10', 'assets/images/citystuff/town10.png');
    this.load.image('town11', 'assets/images/citystuff/town11.png');
    this.load.image('town12', 'assets/images/citystuff/town12.png');
    this.load.image('town13', 'assets/images/citystuff/town13.png');
    this.load.image('town14', 'assets/images/citystuff/town14.png');

    this.load.image('water', 'assets/images/water.png');
    this.load.image('bridge', 'assets/images/bridge.png');
    this.load.image('street', 'assets/images/street.png');
    this.load.image('pathway', 'assets/images/pathway.png');

    this.load.image('dir_choise', 'assets/images/mineBtn.png');

    //Sounds
    this.load.audio('gunshot', ['assets/audio/gunshot2.ogg', 'assets/audio/gunshot2.wav']);
    this.load.audio('tankshot', ['assets/audio/tankshot.ogg', 'assets/audio/tankshot.wav']);
    this.load.audio('ninjashot', ['assets/audio/ninjashot.ogg', 'assets/audio/ninjashot.wav']);
    this.load.audio('snipershot', ['assets/audio/snipershot.ogg', 'assets/audio/snipershot.wav']);
    this.load.audio('place', ['assets/audio/place.ogg', 'assets/audio/place.wav']);
    this.load.audio('pickupshot', ['assets/audio/pickupshot.ogg', 'assets/audio/pickupshot.wav']);
    this.load.audio('tankexplosion', ['assets/audio/tankexplosion.ogg', 'assets/audio/tankexplosion.wav']);

    this.load.audio('music_menu', 'assets/audio/music_menu.mp3');
    this.load.audio('music_winter', 'assets/audio/music_winter.mp3');
    this.load.audio('music_desert', 'assets/audio/music_desert.mp3');
    this.load.audio('music_city', 'assets/audio/music_city.mp3');
    this.load.audio('music_swamp', 'assets/audio/music_swamp.ogg');
    this.load.audio('music_normal', 'assets/audio/music_normal.mp3');
    //Other
    this.load.spritesheet('explosion', 'assets/images/explosion.png', 60, 60, 8);
    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('mine', 'assets/images/mine.png');

    this.load.image('pack1', 'assets/images/med.png');
    this.load.image('pack2', 'assets/images/lives.png');
    this.load.image('pack3', 'assets/images/coins.png');

    this.load.spritesheet('game_logo_moving', 'assets/images/game_logo_moving.png', 550, 150);
    this.load.image('panel', 'assets/images/victory.png');
    this.load.image('gunman1', 'assets/images/gunman_green.png');
    this.load.image('gunman2', 'assets/images/gunman_blue.png');
    this.load.spritesheet('snowflakes', 'assets/images/snowflakes.png', 17, 17);
    this.load.spritesheet('snowflakes_large', 'assets/images/snowflakes_large.png', 64, 64);
    this.load.image('sand_particle', 'assets/images/sand_particle.png');
  },
  // fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
  //   this.progress.text = "Files loaded: "+totalLoaded+"/"+totalFiles;
  // },
  create: function() {
    this.state.start('Menu');
  },
};

