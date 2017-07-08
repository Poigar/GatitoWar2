var TankGame = TankGame || {};
TankGame.Game = function(){};
//Game variables

var base1;
var base2;
var biome;

var normalSpaces = 15*10;

var maxObstacles = 20;
var maxSeas = 3;
var maxSeaSize = 90;
var seaEntities=[];
var seaAmount = 0;

var bridges = [];
var bridgeCount = 0;

var defaultMoney = 50;
var money1 = defaultMoney, money2 = defaultMoney;

var gameIsOver = false;

var selectionSquare1, selectionSquare2;
var selPos1=0, selPos2=0;

var selectedEntity1=0, selectedEntity2=0;

var cards1 = [];
var cards2 = [];

var obstacles = [];
var obstacleCount = 0;

var fncPressed1 = false;
var fncPressed2 = false;

var map = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

var altMap = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

var mineMap = [
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
];

var packMap = [
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
];
var packs = [];
var packIsAlive = [];
var packCount = 0;
var packRadius = 15;
7
var mines = [];
var mineIsAlive = [];
var mineCount = 0;
var minePower = 25;
var mineRadius = 7;
var mineBombRadius = 25;

var planePower = 20;
var planeInterval = [100, 1500];

var spritesBase1 = [];
var spritesBase2 = [];
var otherBg = [];

var entitySpeeds = [0, 0.8, 1.4, 2.2, 0.6, 0.4, 0.7, 1.6, 1.2, 1.4];

var shootInterval = [
  [0,0],
  [1000,2500],//Karavīrs
  [2000,4250],//Pikaps
  [150,750],//Nindzja
  [0,0],//Mīnkaķis, tukšs
  [1000, 2500],//Snaiperis
  [2000,4500],//Tanks
  [1500,3500],//Lidmašīna
  [2000,3500],//Tanks
  [1500,3000],//Helikopters
];

var coo = [
  {"x": 1, "y": 0},
  {"x":-1, "y": 0},
  {"x": 0, "y": 1},
  {"x": 0, "y":-1}
];

var coords = [ //virzieni (relatiivas koordinaatas), lai notiektu, kur shaut  ----  KAARTOT PEEC SVARIIGUMA (1. - vissvariigaakais)
  [ 1, 0],
  [ 0, 1],
  [ 0,-1],
  [-1, 0],
  [-1, 1],
  [ 1,-1],
  [-1,-1],
  [ 1, 1],
];

var coords_vehicle = [ //virzieni (relatiivas koordinaatas), lai notiektu, kur shaut  ----  KAARTOT PEEC SVARIIGUMA (1. - vissvariigaakais)
  [ 1, 0],
  [ 0, 1],
  [ 0,-1],
  [-1, 0],
  [-1, 1],
  [ 1,-1],
  [-1,-1],
  [ 1, 1],
  [ 2, 0],
  [-2, 0],
  [ 0,-2],
  [ 0, 2]
];

var coords_sniper = [
  [1, 0],// Uz priekšu
  [1,-1],// Uz augšu slīpi
  [1, 1],// Uz leju slīpi
  [0,-1],// Uz augšu                          apkaart sev
  [0, 1],// Uz leju
  [-1,-1],// Uz augšu slīpi atpakaļ
  [-1, 1],// Uz leju slīpi atpakaļ
  [-1,0],// Uz atpakaļu

  [ 2,-1],//atziimeeti kartee ar plusiem
  [ 2, 1], //atziimeeti kartee ar plusiem     tuvojas sev
  [2, 0],// Uz priekšu
  [3, 0],// Uz priekšu
  
  [-3, 3],// Uz leju slīpi atpakaļ
  [-3,-3],// Uz augšu slīpi atpakaļ
  [-3,0],// Uz atpakaļu

  [-2,-2],// Uz augšu slīpi atpakaļ
  [-2, 2],// Uz leju slīpi atpakaļ
  [-2,-1],//atziimeeti kartee ar plusiem
  [-2, 1],//atziimeeti kartee ar plusiem
  [-2,0],// Uz atpakaļu

  [-1,-2],//atziimeeti kartee ar plusiem
  [-1, 2],//atziimeeti kartee ar plusiem

  [0, 2],// Uz leju
  [0,-2],// Uz augšu
  [0, 3],// Uz leju
  [0,-3],// Uz augšu

  [ 1,-2],// atziimeeti kartee ar plusiem
  [ 1, 2],//atziimeeti kartee ar plusiem

  [2,-2],// Uz augšu slīpi
  [2, 2],// Uz leju slīpi

  [3,-3],// Uz augšu slīpi
  [3, 3]// Uz leju slīpi

];
//#..#..#
//.#+#+#.
//.+###+.
//###O###
//.+###+.
//.#+#+#.
//#..#..#

var bodyRadius =  [30, 17, 25, 15, 15, 15,  27,  28, 30, 28];
var shootRadius = [ 0, 50,140, 70,  0,210, 100, 100,140, 140];

var shootPower=[0,1,3, 1,-1, 7, 13,  3, 15, 5];

var cost =    [0,5,25,50,50,75,100,100,150,200];
var reward =  [0,7,27,52,52,75,100,100,150,200];

var lives =   [999999999,4,10, 6, 4, 4, 50, 27, 60, 30];

var packChance = 600;
var basePackVal = 10;
var coinPackVal = 20;


var temp_explosion = [];

var dirSelection1 = false;
var dirSelection2 = false;

var dirSelectionEntity1;
var dirSelectionEntity2;

var moneyText1;
var moneyText2;

var style;
var style2 = {font: "30px Arial", fill: "#ffffff"};
var cardStyle = {font: "bold 14px Arial", fill: "#000000"};

var entities = [];
var entityStart = 0;
var entityCount = 0;
var entityIsAlive = [];

if( JSON.parse(localStorage.getItem("options")).sounds == null ){
  var volumeDefault = 0.2;
  var placeVolume = 0.2;
}

if(JSON.parse(localStorage.getItem("options")).sounds){
  var volumeDefault = 0.2;
  var placeVolume = 0.2;
}else{
  var volumeDefault = 0.0;
  var placeVolume = 0.0;
}

var it = 0;

var gameFieldX = (window.innerWidth-(61*15))/2;
var gameFieldY = (window.innerHeight-(61*10))/2;

var backgroundGroup;
var mineGroup;
var entityGroup;
var bulletGroup;
var explosionGroup;
var flyGroup;

TankGame.Game.prototype = {
  preload: function() {
      this.game.time.advancedTiming = true;
  },
  create: function() {

      backgroundGroup = this.add.group();
      overBgGroup = this.add.group();
      mineGroup = this.add.group();
      entityGroup = this.add.group();
      bulletGroup = this.add.group();
      explosionGroup = this.add.group();
      flyGroup = this.add.group();


      biome = rnd(1,5);

      this.loadSounds();

      if(biome==1){
        this.game.stage.backgroundColor = '#ADB730';
        style= {font: "24px Arial", fill: "#fff"}
      }
      if(biome==2){
        this.game.stage.backgroundColor = '#EBEBEB';
        style= {font: "24px Arial", fill: "#000"}
      }
      if(biome==3){
        this.game.stage.backgroundColor = '#E6D29B';
        style= {font: "24px Arial", fill: "#000"};
      }
      if(biome==4){
        this.game.stage.backgroundColor = '#34631E';
        style= {font: "24px Arial", fill: "#fff"}
      }
      if(biome==5){
        this.game.stage.backgroundColor = '#9C9C9C';
        style= {font: "24px Arial", fill: "#fff"}
      }

      for(var i = 0; i<10;i++){
        for(var j = 0; j<15; j++){
          if(biome==1){
            
            if(j==0){
              spritesBase1[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'grass_tex');
              backgroundGroup.add( spritesBase1[i] );
            }else if(j==14){
              spritesBase2[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'grass_tex');
              backgroundGroup.add( spritesBase2[i] );
            }else {
              otherBg[i*15+j] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'grass_tex');
              backgroundGroup.add( otherBg[i*15+j] );
            }
          }else if(biome==2){
            if(j==0){
              spritesBase1[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'snow_tex');
              backgroundGroup.add( spritesBase1[i] );
            }else if(j==14){
              spritesBase2[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'snow_tex');
              backgroundGroup.add( spritesBase2[i] );
            }else{
              otherBg[i*15+j] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'snow_tex');
              backgroundGroup.add( otherBg[i*15+j] );
            }
          }else if(biome==3){
            if(j==0){
              spritesBase1[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'sand_tex');
              backgroundGroup.add( spritesBase1[i] );
            }else if(j==14){
              spritesBase2[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'sand_tex');
              backgroundGroup.add( spritesBase2[i] );
            }else {
              otherBg[i*15+j] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'sand_tex');
              backgroundGroup.add( otherBg[i*15+j] );
            }
          } else if(biome==4){
            if(j==0){
              spritesBase1[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'swamp_tex');
              backgroundGroup.add( spritesBase1[i] );
            }else if(j==14){
              spritesBase2[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'swamp_tex');
              backgroundGroup.add( spritesBase2[i] );
            }else {
              otherBg[i*15+j] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'swamp_tex');
              backgroundGroup.add( otherBg[i*15+j] );
            }
            
          } else if(biome==5){
            if(j==0){
              spritesBase1[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'city_tex');
              backgroundGroup.add( spritesBase1[i] );
            }else if(j==14){
              spritesBase2[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'city_tex');
              backgroundGroup.add( spritesBase2[i] );
            }else {
              otherBg[i*15+j] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'city_tex');
              backgroundGroup.add( otherBg[i*15+j] );
            }
            
          }
          
        }
      }

      if( JSON.parse(localStorage.getItem("options")).obstacles ){

        {
          var amountOfSeas = rnd(1,maxSeas);
          var thisSeaSize = rnd(6, maxSeaSize);
          var sar = [];
          var sarPos = 0;
          for(var i = 0; i<amountOfSeas; i++){
            var tmpY = rnd(0,9);
            var tmpX = rnd(2,12);
            sar.push( {"x":tmpX, "y":tmpY} ); 
          }

          while(sarPos<sar.length && seaAmount<thisSeaSize){
            var sis = sar[sarPos];
            sarPos++;

            if( sis.x<2 || sis.x>12 || sis.y<0 || sis.y>9 ) continue;
            if(map[sis.y][sis.x]!=0) continue;
            
            map[ sis.y ][ sis.x ] = -2;

            if( biome==5 ){
              seaEntities[ seaAmount ] = this.add.sprite( gameFieldX + 61*sis.x, gameFieldY + 61*sis.y,'pathway');
              backgroundGroup.add( seaEntities[ seaAmount ] );
              seaAmount++;
            }
            seaEntities[ seaAmount ] = this.add.sprite( gameFieldX + 61*sis.x, gameFieldY + 61*sis.y,'water');
            overBgGroup.add( seaEntities[ seaAmount ] );
            
            normalSpaces--;
            seaAmount++;

            for(var i = 0; i<4; i++){
              if( rnd(1,4)<3 ) sar.push( {"x": sis.x+coo[i].x, "y": sis.y+coo[i].y} );
            }

          }

        }

          for(var i = 0; i<10; i++){
            for(var j = 0; j<14; j++){
              if( (map[i][j]==-1 || map[i][j]==-2) && (map[i][j+1]==-1 || map[i][j+1]==-2) ){
                if(biome==5){
                  seaEntities[ seaAmount ] = this.add.sprite( gameFieldX + 61*j + 30, gameFieldY + 61*i,'pathway');
                  backgroundGroup.add( seaEntities[ seaAmount ] );
                  seaAmount++;
                }
                seaEntities[ seaAmount ] = this.add.sprite( gameFieldX + 61*j + 30, gameFieldY + 61*i,'water');
                overBgGroup.add( seaEntities[ seaAmount ] );
                seaAmount++;
              }
            }
          }
          for(var i = 0; i<9; i++){
            for(var j = 0; j<15; j++){
              if( (map[i][j]==-1 || map[i][j]==-2) && (map[i+1][j]==-1 || map[i+1][j]==-2) ){
                if(biome==5){
                  seaEntities[ seaAmount ] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i+30,'pathway');
                  backgroundGroup.add( seaEntities[ seaAmount ] );
                  seaAmount++;
                }
                seaEntities[ seaAmount ] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i+30,'water');
                overBgGroup.add( seaEntities[ seaAmount ] );
                seaAmount++;
              }
            }
          }
          for(var i = 0; i<9; i++){
            for(var j = 0; j<14; j++){
              if( (map[i][j]==-1 || map[i][j]==-2) && (map[i+1][j]==-1 || map[i+1][j]==-2)  && (map[i][j+1]==-1 || map[i][j+1]==-2)  && (map[i+1][j+1]==-1 || map[i+1][j+1]==-2) ){
                if(biome==5){
                  seaEntities[ seaAmount ] = this.add.sprite( gameFieldX + 61*j + 30, gameFieldY + 61*i+30,'pathway');
                  backgroundGroup.add( seaEntities[ seaAmount ] );
                  seaAmount++;
                }
                seaEntities[ seaAmount ] = this.add.sprite( gameFieldX + 61*j + 30, gameFieldY + 61*i+30,'water');
                overBgGroup.add( seaEntities[ seaAmount ] );
                seaAmount++;
              }
            }
          }

          if(biome!=5)
          for(var i = 0; i<10; i++){
            for(var j = 0; j<15; j++){
              if( map[i][j]==-2 ){
                
                var side = {"x":0,"y":0};
                for(var ii = 0; ii<4; ii++){
                  side.x = j+coo[ii].x;
                  side.y = i+coo[ii].y;
                  if(side.x>=0 && side.x<15 && side.y>=0 && side.y<10){
                    if( map[side.y][side.x]!=-2 && map[side.y][side.x]!=-1 ){
                      map[i][j] = -1;
                      break;
                    }
                  }
                }

              }
            }
          
          }


        if( rnd(1,3)==1 ) this.generateBridge( rnd(2,12), rnd(0,9) );
        
        var connected = false;

        while( !connected ){

          for(var i = 0; i<10; i++){
            for(var j = 0; j<15; j++){
              altMap[i][j] = 0;
            }
          }

          var sar = [];
          var sarPos = 0;
          for( var i = 0; i<10; i++ ){
            sar.push( {"x": 1, "y": i} );
            altMap[i][1] = 1;
          }

          while( sarPos < sar.length && !connected ){
            var sis = sar[sarPos];
            sarPos++;

            for(var i = 0; i<3; i++){
              var next = {"x": sis.x+coo[i].x, "y": sis.y+coo[i].y};
              if(next.x>=0 && next.x<14 && next.y>=0 && next.y<10){
                if( altMap[next.y][next.x]==0 && map[next.y][next.x]!=-2 && map[next.y][next.x]!=-1 ){
                  sar.push( next );
                  altMap[next.y][next.x] = 1;
                }
              } else if( next.x==14 ){
                connected = true;
                break;
              }
            } 
          }

          if( !connected ){
            var bridgesss = rnd(1,2);
            for(var i = 0; i<bridgesss; i++) this.generateBridge( rnd(2,12), rnd(0,9) );
          }
        }


        /*var amountOfObstacles = rnd(1,maxObstacles);

        for(var i = 0; i<amountOfObstacles; i++){
          var tmpY = rnd(0,9);
          var tmpX = rnd(2,12);
          if( map[tmpY][tmpX]==0 ){
            map[tmpY][tmpX] = -2;
            obstacles[obstacleCount] = this.add.sprite( gameFieldX + 61*tmpX, gameFieldY + 61*tmpY,'tree'+biome);
          }
        }*/

      }

      if(biome==2 && JSON.parse(localStorage.getItem("options")).particles){
        back_emitter = this.game.add.emitter(this.game.world.centerX, -32, 600);
        back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
        back_emitter.maxParticleScale = 0.6;
        back_emitter.minParticleScale = 0.2;
        back_emitter.setYSpeed(20, 100);
        back_emitter.gravity = 0;
        back_emitter.width = this.game.world.width * 1.5;
        back_emitter.minRotation = 0;
        back_emitter.maxRotation = 40;

        mid_emitter = this.game.add.emitter(this.game.world.centerX, -32, 250);
        mid_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
        mid_emitter.maxParticleScale = 1.0;
        mid_emitter.minParticleScale = 0.7;
        mid_emitter.setYSpeed(50, 150);
        mid_emitter.gravity = 0;
        mid_emitter.width = this.game.world.width * 1.5;
        mid_emitter.minRotation = 0;
        mid_emitter.maxRotation = 40;

        front_emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
        front_emitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5]);
        front_emitter.maxParticleScale = 0.6;
        front_emitter.minParticleScale = 0.2;
        front_emitter.setYSpeed(100, 200);
        front_emitter.gravity = 0;
        front_emitter.width = this.game.world.width * 1.5;
        front_emitter.minRotation = 0;
        front_emitter.maxRotation = 40;

        back_emitter.start(false, 14000, 20);
        mid_emitter.start(false, 12000, 40);
        front_emitter.start(false, 6000, 1000);
      }

      var border = this.add.sprite(gameFieldX-5,gameFieldY-5, 'border');
      border.width=915+10;
      border.height=609+10;
      border.height=609+10;

      base1 = this.add.sprite(gameFieldX, gameFieldY, 'base');
      base1.health = 100;
      base1.scale.setTo(0.5);

      base2 = this.add.sprite(15+gameFieldX+15*60, gameFieldY, 'base');
      base2.scale.setTo(-0.5,0.5);
      base2.health = 100;

      backgroundGroup.add(base1);
      backgroundGroup.add(base2);

      var coinP1 = this.add.sprite(5,8,'coin');
      coinP1.width = 20;
      coinP1.height = 20;
      moneyText1 = this.game.add.text(30,7,money1,style);

      var heartP1 = this.add.sprite(5,32,'heart');
      heartP1.width = 20;
      heartP1.height = 20;
      healthText1 = this.game.add.text(30,30,base1.health,style);

      var coinP2 = this.add.sprite(gameFieldX+(15*61)+10 ,8,'coin');
      coinP2.width = 20;
      coinP2.height = 20;
      moneyText2 = this.game.add.text(gameFieldX+(15*61)+35,7,money2,style);

      var heartP2 = this.add.sprite(gameFieldX+(15*61)+10,32,'heart');
      heartP2.width = 20;
      heartP2.height = 20;
      healthText2 = this.game.add.text(gameFieldX+(15*61)+35,30,base2.health,style);

      //Show names
      var names = localStorage.getItem('player_names');
      names = JSON.parse(names);
      var name1 = this.game.add.text(10,window.innerHeight-35,names.name1,style);
      var name2 = this.game.add.text(gameFieldX+61*15+15,window.innerHeight-35,names.name2,style);

      if(this.game.scale.isFullScreen){
        name1.y -= 110;
        name2.y -= 110;
      }
      
      var plFlag1 = this.game.add.sprite(name1.x,name1.y-110,'flag_' + flag1);
      var plFlag2 = this.game.add.sprite(name2.x,name2.y-110,'flag_' + flag2);

      var marX = 8;
      var marY = 5;

      cards1[1] = this.game.add.sprite(10,55,'card1');
      cards1[1].name = this.game.add.text(10+marX,55+marY, 1 ,cardStyle);
      cards2[1] = this.game.add.sprite(gameFieldX+(15*61)+12 ,55,'card1b');
      cards2[1].name = this.game.add.text(gameFieldX+(15*61)+12+marX,55+marY, 1 ,cardStyle);

      cards1[2] = this.game.add.sprite(80,55,'card2');
      cards1[2].name = this.game.add.text(80+marX,55+marY, 2 ,cardStyle);
      cards2[2] = this.game.add.sprite(gameFieldX+(15*61)+84 ,55,'card2b');
      cards2[2].name = this.game.add.text(gameFieldX+(15*61)+84+marX,55+marY, 2 ,cardStyle);

      cards1[3] = this.game.add.sprite(10,140,'card3');
      cards1[3].name = this.game.add.text(10+marX,140+marY, 3 ,cardStyle);
      cards2[3] = this.game.add.sprite(gameFieldX+(15*61)+12 ,140,'card3b');
      cards2[3].name = this.game.add.text(gameFieldX+(15*61)+12+marX,140+marY, 3 ,cardStyle);

      cards1[4] = this.game.add.sprite(80,140,'card4');
      cards1[4].name = this.game.add.text(80+marX,140+marY, 4 ,cardStyle);
      cards2[4] = this.game.add.sprite(gameFieldX+(15*61)+84 ,140,'card4b');
      cards2[4].name = this.game.add.text(gameFieldX+(15*61)+84+marX,140+marY, 4 ,cardStyle);

      cards1[5] = this.game.add.sprite(10,225,'card5');
      cards1[5].name = this.game.add.text(10+marX,225+marY, 5 ,cardStyle);
      cards2[5] = this.game.add.sprite(gameFieldX+(15*61)+12 ,225,'card5b');
      cards2[5].name = this.game.add.text(gameFieldX+(15*61)+12+marX,225+marY, 5 ,cardStyle);

      cards1[6] = this.game.add.sprite(80,225,'card6');
      cards1[6].name = this.game.add.text(80+marX,225+marY, 6 ,cardStyle);
      cards2[6] = this.game.add.sprite(gameFieldX+(15*61)+84 ,225,'card6b');
      cards2[6].name = this.game.add.text(gameFieldX+(15*61)+84+marX,225+marY, 6 ,cardStyle);

      cards1[7] = this.game.add.sprite(10,310,'card7');
      cards1[7].name = this.game.add.text(10+marX,310+marY, 7 ,cardStyle);
      cards2[7] = this.game.add.sprite(gameFieldX+(15*61)+12 ,310,'card7b');
      cards2[7].name = this.game.add.text(gameFieldX+(15*61)+12+marX,310+marY, 7 ,cardStyle);

      cards1[8] = this.game.add.sprite(80,310,'card8');
      cards1[8].name = this.game.add.text(80+marX,310+marY, 8 ,cardStyle);
      cards2[8] = this.game.add.sprite(gameFieldX+(15*61)+84 ,310,'card8b');
      cards2[8].name = this.game.add.text(gameFieldX+(15*61)+84+marX,310+marY, 8 ,cardStyle);

      cards1[9] = this.game.add.sprite(10,395,'card9');
      cards1[9].name = this.game.add.text(10+marX,395+marY, 9 ,cardStyle);
      cards2[9] = this.game.add.sprite(gameFieldX+(15*61)+12 ,395,'card9b');
      cards2[9].name = this.game.add.text(gameFieldX+(15*61)+12+marX,395+marY, 9 ,cardStyle);

    
    selectionSquare1 = this.game.add.sprite((gameFieldX+61),gameFieldY, 'grass_tex_selected');
    selectionSquare2 = this.game.add.sprite((gameFieldX+61*13),gameFieldY, 'grass_tex_selected');

    backgroundGroup.add(selectionSquare1);
    backgroundGroup.add(selectionSquare2);


    for(var i = 0; i<10; i++){
        entities[entityCount] = this.game.add.sprite(gameFieldX+30,gameFieldY+(61*i)+30);
        entities[entityCount].anchor.setTo(0.5);

        entities[entityCount].health = lives[0];
        entities[entityCount].team = 1;
        entities[entityCount].kind = 0;
        entities[entityCount].targ = -1;
        entities[entityCount].nextAlive = entityCount+1;
        
        entityIsAlive[entityCount] = true;

        entityCount++;

        // ----

        entities[entityCount] = this.game.add.sprite(gameFieldX+61*14+30,gameFieldY+(61*i)+30,);
        entities[entityCount].anchor.setTo(0.5);

        entities[entityCount].health = lives[0];
        entities[entityCount].team = 2;
        entities[entityCount].kind = 0;
        entities[entityCount].targ = -1;
        entities[entityCount].nextAlive = entityCount+1;
        
        entityIsAlive[entityCount] = true;

        entityCount++;
    }
    entityStart = entityCount;
    
    //Izsauc funkciju kas saliek visus taustiņus
    this.setKeys();

  },


  update: function() {
    it++;
    if( it > 1000000 ) it = 0;

    if(!gameIsOver){
//------------------------------------------------Saliek kartē -1 ---------------------

      if( rnd(0,packChance)==2 ) this.putPack();

      //Iet cauri visiem entitijiem.........................................................................................................

      lastAlive = entityStart;
      for(var i = entityStart; i<entityCount; i+=0){
        if(!entityIsAlive[i]) {
          i = entities[i].nextAlive;
          continue;
        }
        if( lastAlive!=i ) entities[lastAlive].nextAlive = i;
        lastAlive = i;

        entities[i].healthBarBg.x = entities[i].x;
        entities[i].healthBarBg.y = entities[i].y-20;

        //iekaapis pakaa
        this.pickPack(i, this.collidePack( entities[i].x, entities[i].y, bodyRadius[ entities[i].kind ] ) );

        //iekaapis miinaa
         
        var thisMine = this.collideMine( entities[i].x, entities[i].y, bodyRadius[ entities[i].kind ] );
        if( thisMine != -1 ){
          if( mines[thisMine].team!=entities[i].team && !entities[i].flying ) this.bombMine(thisMine);
        }

        if( entities[i].targ!=-1 && !entityIsAlive[ entities[i].targ ] ){
          this.stopShooting(i);
        }

        if( entities[i].targ!=-1 && entities[i].kind!=7 ) {
          if( it%5==0 && entities[i].kind!=3 ) entities[i].rotation = this.game.physics.arcade.angleBetween(entities[i], entities[ entities[i].targ ]);
          i = entities[i].nextAlive;
          continue;
        };

        // kustiiba

        var step = this.getStep(i);

        entities[i].x += step.x;
        entities[i].y += step.y;

                
        if( it%10==0 && entities[i].kind != 4  && entities[i].kind != 7 ) this.findTarget(i);
        if( it%10==0 && entities[i].kind == 7 ) this.findPlaneTarget(i);

        i = entities[i].nextAlive;
      }

    }
    
    /*var cons = "";
    for(var i = 0; i<10; i++){
      for(var j = 0; j<15; j++){
        cons = cons + map[i][j] + " ";
      }
      cons = cons + "\n";
    }
    console.log(cons);*/
    
  },

  render: function(){
   //this.game.debug.text(this.game.time.fps, 100, 500, "#000");
  },

  buy: function(player){
    if(!gameIsOver){
      if(player==1){

        if( this.collidePoint(gameFieldX+61+30, gameFieldY+(61*selPos1)+30, bodyRadius[selectedEntity1] ) ) return;

        money1 -= cost[selectedEntity1];
        this.refreshMoney();

        if(selectedEntity1==1){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'gunman_walk');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].animations.play('walk',7,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity1==2){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'pickup_tex');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].animations.play('ride',5,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity1==3){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'ninja_walk');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].animations.play('walk',12,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }

        if(selectedEntity1==4){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'minecat');
          var minewalk = entities[entityCount].animations.add('minewalk');
          entities[entityCount].animations.play('minewalk',7,true);
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].littleMove = 0;

          dirSelection1 = true;
          dirSelectionEntity1 = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'dir_choise');
          dirSelectionEntity1.anchor.setTo(0.25,0.5);

          entityGroup.add( entities[entityCount] );
        }

        if(selectedEntity1==5){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'sniper_walk');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].animations.play('walk',3,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity1==6){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'tank_tex');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].animations.play('ride',10,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        
        }
        if(selectedEntity1==7){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'plane_full_tex');
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].manOnBoard = 1;
          flyGroup.add( entities[entityCount] );
          entityIsAlive[entityCount] = true;

          this.firePlane(entityCount,true);
        }
        if(selectedEntity1==8){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'tank2_tex');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].animations.play('ride',10,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity1==9){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'heli_tex_green');
          var ride = entities[entityCount].animations.add('helifly');
          entities[entityCount].animations.play('helifly',20,true);
          entities[entityCount].anchor.setTo(0.5);
          flyGroup.add( entities[entityCount] );

          entities[entityCount].dest = -1;
        }

        

        entities[entityCount].kind = selectedEntity1;
        entities[entityCount].health = lives[selectedEntity1];
        entities[entityCount].team = 1;
        selectedEntity1 = entityCount;

      }
      if(player==2){

        if( this.collidePoint(gameFieldX+61*13+30, gameFieldY+(61*selPos2)+30, bodyRadius[selectedEntity2] ) ) return;

        money2 -= cost[selectedEntity2];
        this.refreshMoney();
        
        if(selectedEntity2==1){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'gunman_walk_blue');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].animations.play('walk',7,true);
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity2==2){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'pickup_tex_blue');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('ride',5,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity2==3){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'ninja_walk_blue');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('walk',12,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }

        if(selectedEntity2==4){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'minecat_blue');
          var minewalk = entities[entityCount].animations.add('minewalk');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('minewalk',7,true);
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].littleMove = 0;

          dirSelection2 = true;
          dirSelectionEntity2 = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'dir_choise');
          dirSelectionEntity2.anchor.setTo(0.25,0.5);
          dirSelectionEntity2.scale.setTo(-1,1);

          entityGroup.add( entities[entityCount] );

        }

        if(selectedEntity2==5){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'sniper_walk_blue');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('walk',3,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity2==6){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'tank_tex_blue');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('ride',10,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity2==7){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'plane_full_tex_blue');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].manOnBoard = 1;
          flyGroup.add( entities[entityCount] );
          entityIsAlive[entityCount] = true;
          this.firePlane(entityCount,true);
        }
        if(selectedEntity2==8){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'tank2_tex_blue');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('ride',10,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity2==9){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'heli_tex_blue');
          var ride = entities[entityCount].animations.add('helifly');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('helifly',20,true);
          entities[entityCount].anchor.setTo(0.5);
          flyGroup.add( entities[entityCount] );

          entities[entityCount].dest = -1;
        }

        entities[entityCount].health = lives[selectedEntity2];
        entities[entityCount].team = 2;
        entities[entityCount].kind = selectedEntity2;
        selectedEntity2 = entityCount;

      }

      entities[entityCount].targ = -1;
      entities[entityCount].dirc = 1;

      if( entities[entityCount].kind==7 || entities[entityCount].kind==9 ){
        entities[entityCount].flying = true;
      } else 
        entities[entityCount].flying = false;

      entityIsAlive[entityCount] = true;

      entities[entityCount].nextAlive = entityCount+1;
      
      if(entities[entityCount].kind == 4) 
        entities[entityCount].mainDir = -1;
      else
        entities[entityCount].mainDir = 0;

      if(entities[entityCount].kind == 4) {
        entities[entityCount].boat = entities[entityCount].addChild( this.game.add.sprite(0 , 0,'boat_front') );
        entities[entityCount].boat.anchor.setTo(0.5);
        entities[entityCount].boat.visible = false;
      }

      entities[entityCount].healthBarBg = this.game.add.sprite( entities[entityCount].x , entities[entityCount].y,'healthbarbg');
      entities[entityCount].healthBarBg.anchor.setTo(0.5);
      entities[entityCount].healthBarBg.y-=20;

      entities[entityCount].healthBar = entities[entityCount].healthBarBg.addChild( this.game.add.sprite(0 , 0,'healthbar') );
      entities[entityCount].healthBar.x-=20;
      entities[entityCount].healthBar.y-=2;

      entities[entityCount].healthBarBg.visible = false;

      entityCount++;

      sound_place.play();
    }
  },

  refreshMoney: function(){
    moneyText1.text = money1;
    moneyText2.text = money2;
  },

  outOfStage: function(x,y,r){
    if( x-r<gameFieldX || x+r>gameFieldX+(61*15) || y-r<gameFieldY || y+r>gameFieldY+(61*10) ) 
      return true;
    else
      return false;
  },

  collideMine: function(x,y,r){

    var lastAlive = 0;
    for(var i = 0; i<mineCount; i+=0){
      if(!mineIsAlive[i]) {
        i = mines[i].nextAlive;
        continue;
      }
      if( lastAlive!=i ) mines[lastAlive].nextAlive = i;
      lastAlive = i;

      if( getDistance(x,y,mines[i].x, mines[i].y)<mineRadius+r ){
        //console.log("pie minas");
        return i;
      }
    
      i = mines[i].nextAlive;
    }
    return -1;
  },

  collidePack: function(x,y,r){

    var lastAlive = 0;
    for(var i = 0; i<packCount; i+=0){
      if(!packIsAlive[i]) {
        i = packs[i].nextAlive;
        continue;
      }
      if( lastAlive!=i ) packs[lastAlive].nextAlive = i;
      lastAlive = i;

      if( getDistance(x,y,packs[i].x, packs[i].y)<packRadius+r ){
        //console.log("pie minas");
        return i;
      }
    
      i = packs[i].nextAlive;
    }
    return -1;
  },

  collideBase: function(x,y,r){
    var ret = false;

    for(var i = 0; i<entityStart; i++){
      if( getDistance(x,y, entities[i].x, entities[i].y) < bodyRadius[ entities[i].kind ]+r ){
        ret = true;
        break;
      }
    }

    return ret;
  },

  collideObstacles: function(x,y,N){
    if(entities[N].flying==false && entities[N].kind!=4 && entities[N].kind!=6 && entities[N].kind!=8){
      if( map[ coordToCellY(y) ][ coordToCellX(x) ]<0 ) return true;
    } else if( entities[N].kind==4 ){
      if( map[ coordToCellY(y) ][ coordToCellX(x) ]<-10 ) return true;
    } else if( entities[N].kind==6 || entities[N].kind==8 ){
      if( map[ coordToCellY(y) ][ coordToCellX(x) ]<0 && map[ coordToCellY(y) ][ coordToCellX(x) ]!=-1 ) return true;
    }
  },

  collideEntity: function(x,y,r,N){
    var ret = false;

    if( x-r<gameFieldX || x+r>gameFieldX+(61*15) || y-r<gameFieldY || y+r>gameFieldY+(61*10) ) return true;
    


    if( this.collideObstacles(x,y,N) ||
        this.collideObstacles(x+r,y,N) ||
        this.collideObstacles(x,y+r,N) ||
        this.collideObstacles(x-r,y,N) ||
        this.collideObstacles(x,y-r,N)  ) return true;


    var lastAlive = 0;
    for(var i = 0; i<entityCount; i+=0){
      if(!entityIsAlive[i]) {
        i = entities[i].nextAlive;
        continue;
      }
      if( lastAlive!=i ) entities[lastAlive].nextAlive = i;
      lastAlive = i;



      if( i!=N && entities[i].kind!=7 && entities[i].kind!=9 && getDistance(x,y, entities[i].x, entities[i].y) < bodyRadius[ entities[i].kind ]+r ){
        ret = true;
        break;
      }

      i = entities[i].nextAlive;
    }
    return ret;
  },

  collideEntityArray: function(x,y,r,N){
    var ret = [];

    var lastAlive = 0;
    for(var i = 0; i<entityCount; i+=0){
      if(!entityIsAlive[i]) {
        i = entities[i].nextAlive;
        continue;
      }
      if( lastAlive!=i ) entities[lastAlive].nextAlive = i;
      lastAlive = i;



      if( i!=N && entities[i].kind!=7 && entities[i].kind!=9 && getDistance(x,y, entities[i].x, entities[i].y) < bodyRadius[ entities[i].kind ]+r ){
        ret.push( i );
      }

      i = entities[i].nextAlive;
    }
    return ret;
  },

  collidePoint: function(x,y,r){

    var ret = false;

    if( x-r<gameFieldX || x+r>gameFieldX+(61*15) || y-r<gameFieldY || y+r>gameFieldY+(61*10) ) return true;


    var lastAlive = 0;
    for(var i = 0; i<entityCount; i+=0){
      if(!entityIsAlive[i]) {
        i = entities[i].nextAlive;
        continue;
      }
      if( lastAlive!=i ) entities[lastAlive].nextAlive = i;
      lastAlive = i;

      if( entities[i].kind!=7 && entities[i].kind!=9 && getDistance(x,y, entities[i].x, entities[i].y) < bodyRadius[ entities[i].kind ]+r ){
        ret = true;
        break;
      }

      i = entities[i].nextAlive;
    }
    return ret;
  },

  getStep: function(N){
    var ret = {"x": 0, "y": 0 };
    
    var stepX = entitySpeeds[ entities[N].kind ];
    var stepY = entitySpeeds[ entities[N].kind ];
    if( entities[N].team==2 ) stepX*=-1;

    if( entities[N].kind == 4 ) return this.getMinecatStep(N);
    if( entities[N].kind == 7 ) return this.getPlaneStep(N);
    if( entities[N].kind == 9 ) return this.getHeliStep(N);

    if( !this.collideEntity( entities[N].x + stepX, entities[N].y, bodyRadius[ entities[N].kind ], N) ){
      if( entities[N].dirc != 1 ){
        entities[N].dirc = 1;
        this.rotate(N);
      } 
      
      ret.x = stepX;
      return ret;
    } else {
      if( entities[N].dirc==1 ){
        //console.log("nevar iet uz prieksu");
        var newDir = rnd(0,1)*2; // 0,2
        this.rotate(N);
        entities[N].dirc = newDir;
      }
    }

    if( entities[N].dirc==0 ){
      if( this.collideEntity( entities[N].x, entities[N].y-stepY, bodyRadius[ entities[N].kind ], N) ){
        entities[N].dirc = 2;
      }
    }

    if( entities[N].dirc==2 ){
      if( this.collideEntity( entities[N].x, entities[N].y+stepY, bodyRadius[ entities[N].kind ], N) ){
        entities[N].dirc = 0;
      }
    }

    this.rotate(N);
    if( entities[N].dirc==2 ){
      ret.y += stepY;
    } else if( !this.collideEntity( entities[N].x, entities[N].y-stepY, bodyRadius[ entities[N].kind ], N) ){
      ret.y -= stepY;
    } else {
      //ret.x -= stepX;
    }

    return ret;

  },

  getPlaneStep: function(N){
    
    var stepX = entitySpeeds[ entities[N].kind ];
    if( entities[N].team==2 ) stepX*=-1;

    if( entities[N].dirc == 1 ){
      if( this.collideBase( entities[N].x + stepX, entities[N].y, bodyRadius[ entities[N].kind ] ) ){
        entities[N].dirc = 3;
        if( entities[N].team==2 ) entities[N].scale.setTo(1,1);
        else entities[N].scale.setTo(-1,1);
      }
    }

    if( entities[N].dirc == 3 ){
      if( this.collideBase( entities[N].x - stepX, entities[N].y, bodyRadius[ entities[N].kind ] ) ){
        entities[N].dirc = 1;
        if( entities[N].team==2 )entities[N].scale.setTo(-1,1);
        else entities[N].scale.setTo(1,1);
      }
    }

    if( entities[N].dirc == 1 ){
      return {"x": stepX, "y": 0 };
    } else {
      return {"x": (stepX*(-1)), "y": 0 };
    }
  },

  getHeliStep: function(N){
    if( entities[N].dest!=-1 && !entityIsAlive[ entities[N].dest ] ) entities[N].dest = -1;
    if( entities[N].targ!=-1 && !entityIsAlive[ entities[N].targ ] ) entities[N].targ = -1;

    if( entities[N].targ<entityStart && it%50==0 ) {entities[N].dest = -1; entities[N].targ = -1; }

    if( entities[N].dest == -1 && entities[N].targ==-1){

      var nextDest = [-1,-1];
      var destDist = [999999999,999999999];

      var lastAlive = entityStart;
      for(var i = entityStart; i<entityCount; i+=0){
        if(!entityIsAlive[i]) {
          i = entities[i].nextAlive;
          continue;
        }
        if( lastAlive!=i ) entities[lastAlive].nextAlive = i;
        lastAlive = i;        

        if( i!=N && entities[i].team!=entities[N].team ){
          var dst = getDistance(entities[N].x, entities[N].y, entities[i].x, entities[i].y);
          if( dst < destDist[0] ){
            destDist[0] = dst;
            nextDest[0] = i;
          }
        }
        i = entities[i].nextAlive;
      }

      if( nextDest[0]!=-1 ){
        entities[N].dest = nextDest[0];
      } else {

        for(var i = 0; i<entityStart; i++){

          if( entities[i].team!=entities[N].team ){
            var dst = getDistance(entities[N].x, entities[N].y, entities[i].x, entities[i].y);
            if( dst < destDist[0] ){
              destDist[1] = destDist[0];
              nextDest[1] = nextDest[0];
              destDist[0] = dst;
              nextDest[0] = i;
            }
          }
        
        }
      }
      //console.log( nextDest[0] + " " + nextDest[1] );
      if( nextDest[1] == -1 )
        entities[N].dest = nextDest[0];
      else
        entities[N].dest = nextDest[ rnd(0,1) ];
    
    }
    //-----

    var diffX = entities[ entities[N].dest ].x-entities[N].x;
    var diffY = entities[ entities[N].dest ].y-entities[N].y;

    if( it%5==0 && entities[N].targ==-1 ){
      entities[N].rotation = this.game.physics.arcade.angleBetween(entities[N], entities[ entities[N].dest ]);
      entities[N].scale.setTo(1,1);
    }

    return {"x": (entitySpeeds[entities[N].kind] * diffX)/(Math.abs(diffY)+Math.abs(diffX)),
            "y": (entitySpeeds[entities[N].kind] * diffY)/(Math.abs(diffY)+Math.abs(diffX))};

  },

  getMinecatStep: function(N){

    if( entities[N].mainDir==-1 ) return {"x":0,"y":0};

    if(it%50) this.putMine( entities[N].x, entities[N].y, entities[N].team );

    if( map[ coordToCellY( entities[N].y+bodyRadius[4] ) ][ coordToCellX( entities[N].x ) ]==-1 ||
        map[ coordToCellY( entities[N].y+bodyRadius[4] ) ][ coordToCellX( entities[N].x ) ]==-2 ){
      entities[N].boat.visible = true;

      if( entities[N].mainDir==1 || entities[N].littleMove>0 ){
        entities[N].boat.loadTexture('boat_side');
      } else {
        entities[N].boat.loadTexture('boat_front');
      }
    } else entities[N].boat.visible = false;

    var spX = entitySpeeds[entities[N].kind];
    if( entities[N].team == 2 ) spX = spX * (-1);

    if( entities[N].mainDir==1 ){
      if( !this.collideEntity( entities[N].x + spX, entities[N].y, bodyRadius[entities[N].kind], N ) ){
        return {"x": spX, "y": 0};
      } else return {"x": 0, "y": 0};
    } 

    if( entities[N].littleMove>0 ){
      if( !this.collideEntity( entities[N].x + spX, entities[N].y, bodyRadius[entities[N].kind], N ) ){
        entities[N].littleMove = Math.max(0, entities[N].littleMove - Math.abs(spX) );
        //console.log( entities[N].littleMove );
        return {"x": spX, "y": 0};
      } else return {"x": 0, "y": 0};
    }
  
    if( entities[N].mainDir==0 ){
      if( !this.collideEntity( entities[N].x, entities[N].y - entitySpeeds[entities[N].kind], bodyRadius[entities[N].kind], N ) ){
        return {"x": 0, "y": (-1)*entitySpeeds[entities[N].kind]};
      } else {

        var collidesWith = this.collideEntityArray( entities[N].x, entities[N].y - entitySpeeds[entities[N].kind], bodyRadius[entities[N].kind], N );

        if( this.outOfStage( entities[N].x, entities[N].y - entitySpeeds[entities[N].kind], bodyRadius[entities[N].kind], N ) ||
          ( collidesWith.length==1 && entities[collidesWith[0]].kind==4 && entities[collidesWith[0]].team==entities[N].team ) ){
          entities[N].littleMove=61;
          entities[N].mainDir = 2;
        }
      }
    }

    if( entities[N].mainDir==2 ){
      if( !this.collideEntity( entities[N].x, entities[N].y + entitySpeeds[entities[N].kind], bodyRadius[entities[N].kind], N ) ){
        return {"x": 0, "y": entitySpeeds[entities[N].kind]};
      } else {

        var collidesWith = this.collideEntityArray( entities[N].x, entities[N].y + entitySpeeds[entities[N].kind], bodyRadius[entities[N].kind], N );

        if( this.outOfStage( entities[N].x, entities[N].y + entitySpeeds[entities[N].kind], bodyRadius[entities[N].kind], N ) ||
          ( collidesWith.length==1 && entities[collidesWith[0]].kind==4 && entities[collidesWith[0]].team==entities[N].team ) ){
          entities[N].littleMove=61;
          entities[N].mainDir = 0;
        }
      }
    }

    return {"x": 0, "y": 0};

  },

  putMine: function(x,y,t){
    if( this.collideMine(x,y,mineRadius+30) == -1 ){
      if( biome!=5 && ( map[ coordToCellY(y) ][ coordToCellX(x) ]==-1 || map[ coordToCellY(y) ][ coordToCellX(x) ]==-2 ) )
        mines[ mineCount ] = this.game.add.sprite( x,  y, 'watermine');
      else
        mines[ mineCount ] = this.game.add.sprite( x,  y, 'mine');
      mineGroup.add( mines[mineCount] );
      mines[ mineCount ].anchor.setTo(0.5);
      mines[ mineCount ].team = t;
      mineIsAlive[ mineCount ] = true;
      mines[ mineCount ].nextAlive = mineCount+1;
      mineCount++;
    }
  },

  bombMine: function(N){

    //console.log("bomb");

    var affected = this.collideEntityArray( mines[N].x, mines[N].y, mineBombRadius );

    for(var i = 0; i<affected.length; i++){
      if( mines[ N ].team != entities[ affected[i] ].team && !entities[i].flying ){
        entities[ affected[i] ].health -= minePower;
        this.redrawHealthBar(affected[i]);
        if( entities[ affected[i] ].health<=0 ) this.killEntity( affected[i] );
      }
    }

    sound_explosion.play();
          
    var krak = rnd(0,100000);
          
    temp_explosion[krak] = this.game.add.sprite(mines[N].x,mines[N].y,'explosion');
    explosionGroup.add(temp_explosion[krak]);
    temp_explosion[krak].anchor.setTo(0.5);
    var explode = temp_explosion[krak].animations.add('explode');
    temp_explosion[krak].animations.play('explode',14,false);
    temp_explosion[krak].animations.currentAnim.onComplete.add(function () {
      temp_explosion[krak].animations.stop(null, true);  
      temp_explosion[krak].destroy();
    }, this);

    mineIsAlive[ N ] = false;
    mines[N].destroy();
  },

  hit: function(team,damage){
    if(team==2){
     // this.game.camera.flash("0xDB2C2C");
      base1.health-=damage;

      money2 += damage;
      this.refreshMoney();

      if(base1.health<=0){
        base1.health=0;
      }
      healthText1.text = base1.health;
    }else{
      //this.game.camera.flash("0x2C3ADB");
      base2.health-=damage;

      money1 += damage;
      this.refreshMoney();

      if(base2.health<=0){
        base2.health=0;
      }
      healthText2.text = base2.health;
    }
  },

  rotate: function(player){
      
      if( entityIsAlive[player] && entities[player].targ == -1 && (entities[player].kind == 2 || entities[player].kind == 5 || entities[player].kind == 6 || entities[player].kind == 8)){
        //console.log('fnk rotate');
        

        if( entities[player].dirc == 1 ){
          this.game.add.tween( entities[player] ).to( { angle: 0 }, 500, "Linear", true);
          //this.game.add.tween( entities[player].healthBarBg ).to( { angle: 0 }, 500, "Linear", true);
        }
        if( entities[player].dirc == 0 ){
          if( entities[player].team == 1 ){
            this.game.add.tween( entities[player] ).to( { angle: -90 }, 500, "Linear", true);
            //this.game.add.tween( entities[player].healthBarBg ).to( { angle: 90 }, 500, "Linear", true);
          }else{
            this.game.add.tween( entities[player] ).to( { angle: 90 }, 500, "Linear", true);
            //this.game.add.tween( entities[player].healthBarBg ).to( { angle: -90 }, 500, "Linear", true);
          }
        }
        if( entities[player].dirc == 2 ){
          if( entities[player].team == 1 ){
            this.game.add.tween( entities[player] ).to( { angle: 90 }, 500, "Linear", true); 
            //this.game.add.tween( entities[player].healthBarBg ).to( { angle: -90 }, 500, "Linear", true);
          }else{ 
            this.game.add.tween( entities[player] ).to( { angle: -90 }, 500, "Linear", true); 
            //this.game.add.tween( entities[player].healthBarBg ).to( { angle: 90 }, 500, "Linear", true);
          }
        }
      }
  },

  putPack: function(){
    if(!gameIsOver){

      var packX = rnd(gameFieldX+61*2+30,gameFieldX+61*12+30);
      var packY = rnd(gameFieldY+30,gameFieldY+61*9+30);

      if( this.collidePack( packX, packY, packRadius )==-1 && !this.collidePoint( packX, packY, packRadius ) ){

        var type = rnd(1,6);
        if(type==4) type = 3;
        if(type==5) type = 3;
        if(type==6) type = 1;

        packs[packCount] = this.game.add.sprite( packX, packY, 'pack'+type );
        mineGroup.add(packs[packCount]);
        packs[packCount].anchor.setTo(0.5);
        packs[packCount].scale.setTo(0.6);
        packs[packCount].type = type;
        packs[packCount].nextAlive = packCount+1;
        packIsAlive[packCount] = true;

        packCount++;
      }
    }
  },

  pickPack: function(player, N){
    if( N==-1 ) return;

    if( packs[N].type == 1 ){

      entities[player].health = lives[ entities[player].kind ];
      this.redrawHealthBar(player);

    } else if(packs[N].type == 2){

      if( entities[player].team == 1 ){
        base1.health += basePackVal;
        healthText1.text = base1.health;
      }
      if( entities[player].team == 2 ){
        base2.health += basePackVal;
        healthText2.text = base2.health;
      }

    } else if(packs[N].type == 3){

      if( entities[player].team == 1 ){
        money1 += coinPackVal;
      }
      if( entities[player].team == 2 ){
        money2 += coinPackVal;
      }
      this.refreshMoney();

    }

    packs[N].destroy();
    packIsAlive[N] = false;
  },

  redrawHealthBar: function(N){
    entities[N].healthBar.width = (entities[N].health*40)/lives[ entities[N].kind ];
    entities[N].healthBarBg.visible = ( entities[N].health < lives[ entities[N].kind ] );
  },

  findTarget: function(N){

    var lastAlive = 0;
    for(var i = 0; i<entityCount; i+=0){
      if(!entityIsAlive[i]) {
        i = entities[i].nextAlive;
        continue;
      }
      if( lastAlive!=i ) entities[lastAlive].nextAlive = i;
      lastAlive = i;

      //console.log("lookin for targets");

      if( i!=N && entities[i].team!=entities[N].team && ( getDistanceEntities( N, i ) - bodyRadius[entities[i].kind] ) < shootRadius[entities[N].kind ] ){
        entities[N].targ = i;
        
        if( entities[N].team==2 && entities[N].kind!=3  && entities[N].kind!=7 ) entities[N].scale.setTo(1,1);
        
        if( entities[N].kind==1 ){
          if( entities[N].team==1 ) 
            entities[N].loadTexture('gunman_shoot');
          else {
            entities[N].loadTexture('gunman_shoot_blue');
          }
        }
        if( entities[N].kind==5 ){
          if( entities[N].team==1 ) 
            entities[N].loadTexture('sniper_shoot');
          else {
            entities[N].loadTexture('sniper_shoot_blue');
          } 
        }
        if( entities[N].kind != 3 &&  entities[N].kind!=7 ){
          entities[N].rotation = this.game.physics.arcade.angleBetween(entities[N], entities[ entities[N].targ ]);
        }
        this.fire( N, i, true );
        return;
      }

      i = entities[i].nextAlive;
    }

  },

  findPlaneTarget: function(N){

    var lastAlive = 0;
    for(var i = 0; i<entityCount; i+=0){
      if(!entityIsAlive[i]) {
        i = entities[i].nextAlive;
        continue;
      }
      if( lastAlive!=i ) entities[lastAlive].nextAlive = i;
      lastAlive = i;

      //console.log("lookin for targets");

      var isFlying = (entities[i].kind==7 || entities[i].kind==9);

      if( i!=N && isFlying && entities[i].team!=entities[N].team && ( getDistanceEntities( N, i ) - bodyRadius[entities[i].kind] ) < shootRadius[entities[N].kind ] ){
        entities[N].targ = i;

        this.fire( N, i, true );
        return;
      }

      i = entities[i].nextAlive;
    }

  },

  fire: function(x, y, firstTime){
    if(!gameIsOver){

      if( !entityIsAlive[x] || !entityIsAlive[y]) return;

      if( Math.sqrt( Math.abs(entities[x].x-entities[y].x)*Math.abs(entities[x].x-entities[y].x) + Math.abs(entities[x].y-entities[y].y)*Math.abs(entities[x].y-entities[y].y) ) > shootRadius[entities[x].kind]*1.3){
        this.stopShooting( x );
        return;
      }

      if(!firstTime){

        var doubleBullet = ( entities[x].kind==2 || entities[x].kind==7 || entities[x].kind==9 );

        var bullet2;
        var tviins2;

        var bullet = this.game.add.sprite( entities[x].position.x, entities[x].position.y, 'bullet' );
        bulletGroup.add(bullet);
        var tviins = this.game.add.tween( bullet ).to( {x: entities[y].position.x , y: entities[y].position.y}, 250, "Linear", true);
        

        if( doubleBullet ){
          bullet2 = this.game.add.sprite( entities[x].position.x, entities[x].position.y, 'bullet' );
          bulletGroup.add(bullet2);
          tviins2 = this.game.add.tween( bullet2 ).to( {x: entities[y].position.x , y: entities[y].position.y}, 350, "Linear", true);
        }

        if(entities[x].kind==1)sound_gunshot.play();
        if(entities[x].kind==2)sound_pickupshot.play();
        if(entities[x].kind==3)sound_ninjashot.play();
        if(entities[x].kind==5)sound_snipershot.play();
        if(entities[x].kind==6)sound_tankshot.play();
        if(entities[x].kind==7)sound_pickupshot.play();
        if(entities[x].kind==8)sound_tankshot.play();
        if(entities[x].kind==9)sound_pickupshot.play();
        //console.log(entities[x].kind);

        tviins.onComplete.add( function(){
          bullet.destroy();
          if( doubleBullet )bullet2.destroy();
          
          if( y<entityStart ) {
            
            this.hit( (entities[y].team )%2+1, shootPower[ entities[x].kind ] )
            if(base2.health<=0){
              this.gameOver(1);
            }
            if(base1.health<=0){
              this.gameOver(2);
            }

          } else {
            entities[y].health -= shootPower[ entities[x].kind ];
            this.redrawHealthBar(y);
            if( entities[y].health <=0 ){
              this.killEntity(y);
            }
          }
          
        },this);
      }

      this.game.time.events.add( rnd( shootInterval[ entities[x].kind ][0],shootInterval[ entities[x].kind ][1] ), function(){
        if( entityIsAlive[x] && entityIsAlive[y] ){
          this.fire(x,y,false);
        } else if( entityIsAlive[x] ) this.stopShooting( x );
      }, this);
    }
  },

  killEntity: function(x){

      if( entityIsAlive[x] ){

        entityIsAlive[x] = false;
        

        if(entities[x].team==2){
          money1+=reward[entities[x].kind];
          moneyText1.text=money1;
        }else{
          money2+=reward[entities[x].kind];
          moneyText2.text=money2;
        }

        if(entities[x].kind==6 || entities[x].kind==8 || entities[x].kind==2 || entities[x].kind==7 || entities[x].kind==9){ //   SPRAADZIENS
          sound_explosion.play();
          
          var krak = rnd(0,100000);
          temp_explosion[krak] = this.game.add.sprite(entities[x].position.x,entities[x].position.y,'explosion');
          explosionGroup.add(temp_explosion[krak]);
          temp_explosion[krak].anchor.setTo(0.5);
          var explode = temp_explosion[krak].animations.add('explode');
          temp_explosion[krak].animations.play('explode',14,false);
          temp_explosion[krak].animations.currentAnim.onComplete.add(function () {
            temp_explosion[krak].animations.stop(null, true);  
            temp_explosion[krak].destroy();
          }, this);
        }else{
          var angel = this.game.add.sprite(entities[x].position.x,entities[x].position.y,'angel');
          angel.anchor.setTo(0.5);
          var fly = angel.animations.add('fly');
          angel.animations.play('fly',12,true);

          var tween_angel = this.game.add.tween( angel ).to( {alpha: 0 , y: entities[x].position.y-100}, 500, "Linear", true);
        
          tween_angel.onComplete.add( function(){
            angel.destroy();
          },this);

        }

        entities[x].healthBarBg.destroy();
        entities[x].destroy();
        
      }

  },

  stopShooting: function(i){
    entities[i].targ = -1;
    if( entities[i].kind == 9 ) entities[i].dest = -1;
    entities[i].rotation = 0;
    if(entities[i].team == 1){
      if(entities[i].kind == 1){
        entities[i].loadTexture('gunman_walk', [0,1], false);
        entities[i].animations.add('walko');
        entities[i].animations.play('walko',7,true);
        entities[i].animations.paused = false;
      }
      if(entities[i].kind == 5){
        entities[i].loadTexture('sniper_walk', [0,1], false);
        entities[i].animations.add('walko');
        entities[i].animations.play('walko',3,true);
        entities[i].animations.paused = false;
      }
    } else {
      if( entities[i].kind!=3 && entities[i].kind!=7 ) entities[i].scale.setTo(-1,1);

      if(entities[i].kind == 1){
        entities[i].loadTexture('gunman_walk_blue', [0,1], false);
        entities[i].animations.add('walko');
        entities[i].animations.play('walko',7,true);
        
        entities[i].animations.paused = false;
      }
      if(entities[i].kind == 5){
        entities[i].loadTexture('sniper_walk_blue', [0,1], false);
        entities[i].animations.add('walko');
        entities[i].animations.play('walko',3,true);
        entities[i].animations.paused = false;
      }
    }
  },

  fireBase: function(x,y,team){
    if(!gameIsOver){

      var doubleBullet = (entities[x].kind==2 || entities[x].kind==7 || entities[x].kind==9);

      var bullet = this.game.add.sprite( entities[x].position.x, entities[x].position.y, 'bullet' );
      var bullet2;
      if( doubleBullet ){
        bullet2 = this.game.add.sprite( entities[x].position.x, entities[x].position.y, 'bullet' );
        bulletGroup.add(bullet2);
      }
      bulletGroup.add(bullet);
      
      var tviins;
      var tviins2;
      if(team==1){
        tviins = this.game.add.tween( bullet ).to( {x: spritesBase2[y].position.x +30, y: spritesBase2[y].position.y +30}, 250, "Linear", true);
        if( doubleBullet ){
          tviins2 = this.game.add.tween( bullet2 ).to( {x: spritesBase2[y].position.x +30, y: spritesBase2[y].position.y +30}, 350, "Linear", true);
        }
      }
      else{
        tviins = this.game.add.tween( bullet ).to( {x: spritesBase1[y].position.x +30, y: spritesBase1[y].position.y +30}, 250, "Linear", true);
        if( doubleBullet ){
          tviins2 = this.game.add.tween( bullet2 ).to( {x: spritesBase1[y].position.x +30, y: spritesBase1[y].position.y +30}, 350, "Linear", true);
        }
      }

      tviins.onComplete.add( function(){
        bullet.destroy();
        if( doubleBullet ) bullet2.destroy();
        this.hit(team, shootPower[ entities[x].kind ]);
        if(base2.health<=0){
          this.gameOver(team);
        }
        if(base1.health<=0){
          this.gameOver(team);
        }
      },this);


      if(entities[x].kind==1)sound_gunshot.play();
      if(entities[x].kind==2)sound_pickupshot.play();
      if(entities[x].kind==3)sound_ninjashot.play();
      if(entities[x].kind==5)sound_snipershot.play();
      if(entities[x].kind==6)sound_tankshot.play();
      if(entities[x].kind==7)sound_pickupshot.play();
      if(entities[x].kind==8)sound_tankshot.play();
      if(entities[x].kind==9)sound_gunshot.play();

      if(team == 1){
        this.game.time.events.add( rnd( shootInterval[ entities[x].kind ][0],shootInterval[ entities[x].kind ][1] ), function(){
          if(entityIsAlive[x] && base2.health>0){
            this.fireBase(x,y,team);
          }
        }, this);
      } else {
        this.game.time.events.add( rnd( shootInterval[ entities[x].kind ][0],shootInterval[ entities[x].kind ][1] ), function(){
          if(entityIsAlive[x] && base1.health>0){
            this.fireBase(x,y,team);
          }
        }, this);
      }
    }
  },

  firePlane: function(x, firstTime){
    if(!gameIsOver && entityIsAlive[x]){

      if(!firstTime || true){ //nav gaidiishanas laika

        var entPosX = Math.floor((entities[x].position.x-gameFieldX)/61);
        var entPosY = Math.floor((entities[x].position.y-gameFieldY)/61);

        sound_explosion.play();

        var krak = rnd(0,100000);
        temp_explosion[krak] = this.game.add.sprite(entities[x].position.x,entities[x].position.y,'explosion');
        explosionGroup.add(temp_explosion[krak]);
        temp_explosion[krak].anchor.setTo(0.5);
        temp_explosion[krak].scale.setTo(0.6);
        var explode = temp_explosion[krak].animations.add('explode');
        temp_explosion[krak].animations.play('explode',14,false);
        temp_explosion[krak].animations.currentAnim.onComplete.add(function () {
          temp_explosion[krak].animations.stop(null, true);  
          temp_explosion[krak].destroy();
        }, this);

        
        var lastAlive = 0;
        for(var i = 0; i<entityCount; i+=0){
          if(!entityIsAlive[i]) {
            i = entities[i].nextAlive;
            continue;
          }
          if( lastAlive!=i ) entities[lastAlive].nextAlive = i;
          lastAlive = i;

          var attackOnAir = ( entities[i].kind!=7 && entities[i].kind!=9 );

          if( i!=x && attackOnAir && entities[i].team!=entities[x].team && getDistance(entities[x].x, entities[x].y, entities[i].x, entities[i].y) < bodyRadius[ entities[i].kind ]+25 ){
            entities[i].health -= planePower;
            this.redrawHealthBar(i);
            if(entities[i].health<=0) 
              this.killEntity( i );
          }
        
          i = entities[i].nextAlive;
        }


      }

      this.game.time.events.add( rnd( planeInterval[0],planeInterval[1] ), function(){
        if(entityIsAlive[x]){
          this.firePlane(x,false);
        }
      }, this);
    }
  },

  landingOperation: function(k, t){
    var lastAlive = 0;
    for(var i = 0; i<entityCount; i+=0){
      if(!entityIsAlive[i]) {
        i = entities[i].nextAlive;
        continue;
      }
      if( lastAlive!=i ) entities[lastAlive].nextAlive = i;
      lastAlive = i;

      if( entities[i].team == t && entities[i].kind == k ){
        var notOnObstacle = true;
        if( map[ coordToCellY( entities[i].y ) ][ coordToCellX( entities[i].x) ]<0 ) notOnObstacle = false;

        if( entities[i].manOnBoard>0 && notOnObstacle && !this.collidePoint( entities[i].x, entities[i].y, bodyRadius[ 1 ] ) ){



          entities[i].manOnBoard--;

          if( t==1 ){
            entities[entityCount] = this.game.add.sprite(entities[i].x,entities[i].y,'gunman_walk');
            var walk = entities[entityCount].animations.add('walk');
            entities[entityCount].animations.play('walk',7,true);
            entities[entityCount].anchor.setTo(0.5);
            entityGroup.add( entities[entityCount] );
          
            if( entities[i].kind==7 ) entities[i].loadTexture( 'plane_tex' );
          } else {
            entities[entityCount] = this.game.add.sprite(entities[i].x,entities[i].y,'gunman_walk_blue');
            var walk = entities[entityCount].animations.add('walk');
            entities[entityCount].animations.play('walk',7,true);
            entities[entityCount].scale.setTo(-1,1);
            entities[entityCount].anchor.setTo(0.5);
            entityGroup.add( entities[entityCount] );

            if( entities[i].kind==7 ) entities[i].loadTexture( 'plane_tex_blue' );
          }

          entities[entityCount].health = lives[1];
          entities[entityCount].team = t;
          entities[entityCount].kind = 1;
          entities[entityCount].flying = false;

          entities[entityCount].targ = -1;
          entities[entityCount].dirc = 1;

          entityIsAlive[entityCount] = true;

          entities[entityCount].healthBarBg = this.game.add.sprite( entities[entityCount].x , entities[entityCount].y,'healthbarbg');
          entities[entityCount].healthBarBg.anchor.setTo(0.5);
          entities[entityCount].healthBarBg.y-=20;

          entities[entityCount].healthBar = entities[entityCount].healthBarBg.addChild( this.game.add.sprite(0 , 0,'healthbar') );
          entities[entityCount].healthBar.x-=20;
          entities[entityCount].healthBar.y-=2;

          entities[entityCount].healthBarBg.visible = false;

          entities[entityCount].nextAlive = entityCount+1;

          sound_place.play();
          
          entityCount++;

        }
      }

      i = entities[i].nextAlive;
    }
  },

  generateBridge: function(x,y){
    if( map[y][x]!=-1 && map[y][x]!=-2 ) return;

    var i = x;
    while( map[y][i]==-1 || map[y][i]==-2 ){
      map[y][i] = 1;
      if( biome==5 )
        bridges[bridgeCount] = this.game.add.sprite(gameFieldX+61*i+30,gameFieldY+61*y+30,'street');
      else
        bridges[bridgeCount] = this.game.add.sprite(gameFieldX+61*i+30,gameFieldY+61*y+30,'bridge');
      bridges[bridgeCount].anchor.setTo(0.5);
      overBgGroup.add(bridges[bridgeCount]);
      bridgeCount++;
      i++;
    }
    i = x-1;
    while( map[y][i]==-1 || map[y][i]==-2 ){
      map[y][i] = 1;
      if( biome==5 )
        bridges[bridgeCount] = this.game.add.sprite(gameFieldX+61*i+30,gameFieldY+61*y+30,'street');
      else
        bridges[bridgeCount] = this.game.add.sprite(gameFieldX+61*i+30,gameFieldY+61*y+30,'bridge');
      bridges[bridgeCount].anchor.setTo(0.5);
      overBgGroup.add(bridges[bridgeCount]);
      bridgeCount++;
      i--;
    }
  },

  gameOver: function(team){
    if(!gameIsOver){
      var panel = this.game.add.sprite(window.innerWidth/2,window.innerHeight/2,'panel');
      panel.anchor.setTo(0.5);

      var winnerFlag;
      var winner;
      if(team == 1){
        winnerFlag = this.game.add.sprite(window.innerWidth/2+10,window.innerHeight/2+45, "flag_"+flag1);
        winner = this.game.add.sprite(window.innerWidth/2+10,window.innerHeight/2+35, "gunman"+team);
        winner.scale.setTo(0.4);
        winner.anchor.setTo(0.5);
        winner.x = winner.x - 70;
        winnerFlag.x = winnerFlag.x + 10;
      } else {
        winnerFlag = this.game.add.sprite(window.innerWidth/2+10,window.innerHeight/2+45, "flag_"+flag2);
        winner = this.game.add.sprite(window.innerWidth/2+10,window.innerHeight/2+35, "gunman"+team);
        winner.scale.setTo(-0.4,0.4);
        winner.anchor.setTo(0.4,0.5);
        winner.x = winner.x + 70;
        winnerFlag.x = winnerFlag.x - 10;
      }

      var restartbtn = this.game.add.button(window.innerWidth/2-270, window.innerHeight/2+120, 'restartBtn', function(){
        this.prepareNewGame();
        this.state.start('Game');
      }, this);
      restartbtn.anchor.setTo(0.5);

      var menubtn = this.game.add.button(window.innerWidth/2+270, window.innerHeight/2+120, 'menuBtn', function(){
        this.prepareNewGame();
        this.state.start('Menu');
      }, this);
      menubtn.anchor.setTo(0.5);

      winnerFlag.anchor.setTo(0.5);
      if(team==1)
        winnerText = this.game.add.text(window.innerWidth/2-120,panel.y+110,JSON.parse(localStorage.getItem("player_names")).name1,style2);
      else
        winnerText = this.game.add.text(window.innerWidth/2-120,panel.y+110,JSON.parse(localStorage.getItem("player_names")).name2,style2);

      winnerText.x = Math.floor(window.innerWidth/2) - Math.floor(winnerText.width/2);

      gameIsOver = true;
    }
  },

  loadSounds: function(){
    sound_gunshot = this.game.add.audio('gunshot');
    sound_gunshot.allowMultiple = true;
    sound_gunshot.volume = volumeDefault;

    sound_pickupshot = this.game.add.audio('pickupshot');
    sound_pickupshot.allowMultiple = true;
    sound_pickupshot.volume = volumeDefault;

    sound_tankshot = this.game.add.audio('tankshot');
    sound_tankshot.allowMultiple = true;
    sound_tankshot.volume = volumeDefault;

    sound_ninjashot = this.game.add.audio('ninjashot');
    sound_ninjashot.allowMultiple = true;
    sound_ninjashot.volume = volumeDefault;

    sound_snipershot = this.game.add.audio('snipershot');
    sound_snipershot.allowMultiple = true;
    sound_snipershot.volume = volumeDefault;

    sound_explosion = this.game.add.audio('tankexplosion');
    sound_explosion.allowMultiple = true;
    sound_explosion.volume = volumeDefault;

    sound_place = this.game.add.audio('place');
    sound_place.allowMultiple = true;
    sound_place.volume = placeVolume;


    if(JSON.parse(localStorage.getItem("options")).music){
      music.stop();
      window.music_playing=false;

      if(biome==1){
          music = this.game.add.audio('music_normal');
          music.play();
          music.volume = 0.5;
          window.music_playing=true;
        }else if(biome==2){
          music = this.game.add.audio('music_winter');
          music.play();
          music.volume = 0.5;
          window.music_playing=true;
        }else if(biome==3){
          music = this.game.add.audio('music_desert');
          music.play();
          music.volume = 0.3;
          window.music_playing=true;
        }else if(biome==4){
          music = this.game.add.audio('music_swamp');
          music.play();
          music.volume = 0.3;
          window.music_playing=true;
        }
        else if(biome==5){
          music = this.game.add.audio('music_city');
          music.play();
          music.volume = 0.3;
          window.music_playing=true;
        }
    }

  },

  

  setKeys: function(){


    var qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    qKey.onDown.add(function(){
      fncPressed1 = true;
    });
    qKey.onUp.add(function(){
      fncPressed1 = false;
    });

    var plusKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_ADD);
    plusKeyNumpad.onDown.add(function(){
      fncPressed2 = true;
    });
    plusKeyNumpad.onUp.add(function(){
      fncPressed2 = false;
    });

    var oneKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    oneKey.onDown.add(function(){
      if(money1>=cost[1] && !dirSelection1){
        selectedEntity1=1;
        this.buy(1);
      }
    }, this);

    var twoKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    twoKey.onDown.add(function(){
      if(money1>=cost[2] && !dirSelection1){
        selectedEntity1=2;
        this.buy(1);
      }
    }, this);

    var threeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    threeKey.onDown.add(function(){
      if(money1>=cost[3] && !dirSelection1){
        selectedEntity1=3;
        this.buy(1);
      }
    }, this);

    var fourKey = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    fourKey.onDown.add(function(){
      if(money1>=cost[4] && !dirSelection1){
        selectedEntity1=4;
        this.buy(1);
      }
    }, this);

    var fiveKey = this.game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    fiveKey.onDown.add(function(){
      if(money1>=cost[5] && !dirSelection1){
        selectedEntity1=5;
        this.buy(1);
      }
    }, this);

    var sixKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SIX);
    sixKey.onDown.add(function(){
      if(money1>=cost[6] && !dirSelection1){
        selectedEntity1=6;
        this.buy(1);
      }
    }, this);

    var sevenKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
    sevenKey.onDown.add(function(){
      if(!dirSelection1){
        if( fncPressed1 ){
          this.landingOperation(7,1);
        } else if(money1>=cost[7]){
          selectedEntity1=7;
          this.buy(1);
        }
      }
    }, this);

    var eightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
    eightKey.onDown.add(function(){
      if(money1>=cost[8] && !dirSelection1){
        selectedEntity1=8;
        this.buy(1);
      }
    }, this);

    var nineKey = this.game.input.keyboard.addKey(Phaser.Keyboard.NINE);
    nineKey.onDown.add(function(){
      if(money1>=cost[9] && !dirSelection1){
        selectedEntity1=9;
        this.buy(1);
      }
    }, this);


    var oneKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
    oneKeyNumpad.onDown.add(function(){
      if(money2>=cost[1] && !dirSelection2){
        selectedEntity2=1;
        this.buy(2);
      }
    }, this);

    var twoKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
    twoKeyNumpad.onDown.add(function(){
      if(money2>=cost[2] && !dirSelection2){
        selectedEntity2=2;
        this.buy(2);
      }
    }, this);

    var threeKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
    threeKeyNumpad.onDown.add(function(){
      if(money2>=cost[3] && !dirSelection2){
        selectedEntity2=3;
        this.buy(2);
      }
    }, this);

    var fourKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
    fourKeyNumpad.onDown.add(function(){
      if(money2>=cost[4] && !dirSelection2){
        selectedEntity2=4;
        this.buy(2);
      }
    }, this);

    var fiveKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5);
    fiveKeyNumpad.onDown.add(function(){
      if(money2>=cost[5] && !dirSelection2){
        selectedEntity2=5;
        this.buy(2);
      }
    }, this);

    var sixKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
    sixKeyNumpad.onDown.add(function(){
      if(money2>=cost[6] && !dirSelection2){
        selectedEntity2=6;
        this.buy(2);
      }
    }, this);

    var sevenKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
    sevenKeyNumpad.onDown.add(function(){
      if(!dirSelection2){
        if( fncPressed2 ){
          this.landingOperation(7,2);
        } else if(money2>=cost[7]){
          selectedEntity2=7;
          this.buy(2);
        }
      }
    }, this);

    var eightKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
    eightKeyNumpad.onDown.add(function(){
      if(money2>=cost[8] && !dirSelection2){
        selectedEntity2=8;
        this.buy(2);
      }
    }, this);

    var nineKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);
    nineKeyNumpad.onDown.add(function(){
      if(money2>=cost[9] && !dirSelection2){
        selectedEntity2=9;
        this.buy(2);
      }
    }, this);

    //Kustina izveeles lauku
    var wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.add(function(){
      
      if(dirSelection1){
        entities[selectedEntity1].mainDir = 0;
        entities[selectedEntity1].dirc = 0;
        entities[selectedEntity1].currDir = 0;
        dirSelection1 = false;
        dirSelectionEntity1.destroy();
      } else {

        if(selPos1>0)selPos1--;
        else selPos1=9;
        selectionSquare1.position.y = (gameFieldY)+61*selPos1;
      
      }
    }, this);

    var sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    sKey.onDown.add(function(){

      if(dirSelection1){
        entities[selectedEntity1].mainDir = 2;
        entities[selectedEntity1].dirc = 2;
        entities[selectedEntity1].currDir = 2;
        dirSelection1 = false;
        dirSelectionEntity1.destroy();
      } else {

        if(selPos1<9)selPos1++;
        else selPos1=0;
        selectionSquare1.position.y = (gameFieldY)+61*selPos1;

      }
    }, this);

    var dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    dKey.onDown.add(function(){

      if(dirSelection1){
        entities[selectedEntity1].mainDir = 1;
        entities[selectedEntity1].dirc = 1;
        dirSelection1 = false;
        dirSelectionEntity1.destroy();
      } 

    }, this);




    var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(function(){

      if(dirSelection2){
      
        entities[selectedEntity2].mainDir = 0;
        entities[selectedEntity2].dirc = 0;
        entities[selectedEntity2].currDir = 0;
        dirSelection2 = false;
        dirSelectionEntity2.destroy();

      } else {
        
        if(selPos2>0)selPos2--;
        else selPos2=9;
        selectionSquare2.position.y = (gameFieldY)+61*selPos2;
      
      }
    }, this);

    var downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(function(){

      if(dirSelection2){
      
        entities[selectedEntity2].mainDir = 2;
        entities[selectedEntity2].dirc = 2;
        entities[selectedEntity2].currDir = 2;
        dirSelection2 = false;
        dirSelectionEntity2.destroy();

      } else {

        if(selPos2<9)selPos2++;
        else selPos2=0;
        selectionSquare2.position.y = (gameFieldY)+61*selPos2;

      }
    }, this);

    var leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(function(){

      if(dirSelection2){
      
        entities[selectedEntity2].mainDir = 1;
        entities[selectedEntity2].dirc = 1;
        dirSelection2 = false;
        dirSelectionEntity2.destroy();

      }

    }, this);
  },

  prepareNewGame: function(){
    entities = [];
    entityIsAlive = [];
    packs = [];
    packIsAlive = [];
    packCount = 0;
    mines = [];
    minesIsAlive = [];
    mineCount = 0;
    seaEntities = [];
    seaAmount = 0;
  


    entityCount = 0;
    selPos1 = 0;
    selPos2 = 0;
    gameIsOver = false;
    money1 = defaultMoney;
    money2 = defaultMoney;

    for(var i = 0; i<10; i++){
      for(var j = 0; j<15;j++){
        mineMap[i][j] = -1;
      }
    }
    for(var i = 0; i<10; i++){
      for(var j = 0; j<15;j++){
        map[i][j] = 0;
      }
    }
    for(var i = 0; i<10; i++){
      for(var j = 0; j<15;j++){
        altMap[i][j] = 0;
      }
    }
    for(var i = 0; i<10; i++){
      for(var j = 0; j<15;j++){
        packMap[i][j] = -1;
      }
    }

  }

};

function getDistanceEntities(x, y){
  //console.log("nosaka distanci");
  if( !entityIsAlive[x] || !entityIsAlive[y] ) return 999999999;

  return getDistance( entities[x].x, entities[x].y, entities[y].x, entities[y].y );
}

function getDistance(x1, y1, x2, y2){

  var xDist = Math.abs( x1 - x2 );
  var yDist = Math.abs( y1 - y2 );
  return Math.sqrt( ( xDist*xDist ) + ( yDist*yDist ) );
}

function rnd(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function coordToCellX(x){
  return Math.floor((x-gameFieldX)/61);
}

function coordToCellY(y){
  return Math.floor((y-gameFieldY)/61);
}