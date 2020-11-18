const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bg;
var soldier, soldierImage, enemyMove;
var winterbg;

var ground;
var platform = []

var enemyBulletGroup
var edges;

var inviGroup;
var cols;
var rows;
var oldColValue = -1;
var visiblity = 255

var bgImg;
var x1 = 0;
var x2;

//var scrollSpeed = 2;

function preload() {
  bgImg = loadImage("sprites/winter_1.jpg") 
  soldierRImage = loadImage("sprites/SOLDIER_Right.png")
  enemyImage = loadImage("sprites/SOLDIER_left.png")
  bulletImage = loadImage ("sprites/bullet.png")
  bulletLImage = loadImage ("sprites/BulletLeft.png")
}

function setup(){
    var canvas = createCanvas(1600,700);

    x2 = width;


    engine = Engine.create();
    world = engine.world;

    // bg = createSprite(1150,200,2000,800)
    // bg.addImage("bg",winterbg)
    // bg.scale = 2.5

    edge = createSprite(0,500,20,500)

    soldier = createSprite(100,550,30,30)
    soldier.addImage("sr",soldierRImage)
    soldier.scale = 0.3
    soldier.debug = true;
    soldier.setCollider("rectangle", -100 ,0 ,200,500)

    ground = createSprite(800,690,3600,20)
    ground.visible = true

    inviGroup = new Group();
    enemyGroup = new Group();
    bulletGroup = new Group();
    enemyBulletGroup = new Group();

       

}



function draw(){
     background(0);

     image(bgImg, x1, 0, width, height);
     image(bgImg, x2, 0, width, height);
     
    //  x1 -= scrollSpeed;
    //  x2 -= scrollSpeed;
     
     if (x1 < -soldier.x){
       x1 = width;
     }
     if (x2 < -soldier.x){
       x2 = width;
     }
 
    drawSprites();
    Engine.update(engine);
     
    if(keyDown("right")){
      soldier.x = soldier.x + 5
      
    }

     if(keyDown("left")){
      soldier.x = soldier.x - 5
       
    }

    if(keyDown("space") && soldier.y>400) {
      
      soldier.velocityY = -10
       
  }
  soldier.velocityY = soldier.velocityY + 0.5
  soldier.collide(ground)
  soldier.collide(inviGroup)
  soldier.collide(edge)


// if(soldier.x % 800 === 0){
//  bg.x = soldier.x + 1200
// }
    
    if(soldier.x > ground.x ){
        ground.x = soldier.x +100;
    } else if (soldier.x < 800) {
        ground.x = soldier.x - 500 
    }
    camera.position.x = soldier.x +600
 

    if(soldier.x % 1000 === 0 ){
      platform.push(new Platform (camera.x+800,random(500,600),200,20))

      for(var i=0;i<platform.length;i++){
      invisiblePlatform = createSprite(camera.x+800,platform[i].body.position.y,200,20)
      invisiblePlatform.shapeColor = "brown"
      platform.pop();
      
      inviGroup.add(invisiblePlatform)
      inviGroup.setLifetimeEach(400);
      
      }
       
    }
    

    if(keyWentDown("s")){
      createBullets();

    }

    if(bulletGroup.isTouching(enemyGroup)){
      enemyGroup.destroyEach();
      bulletGroup.destroyEach();
      enemyBulletGroup.destroyEach();
    }

    if(enemyGroup.isTouching(soldier)){
      enemyGroup.setVelocityXEach(-4)
      enemyBulletGroup.setVelocityXEach(-30)
      if(enemyBulletGroup.isTouching(soldier)){
        enemyBulletGroup.destroyEach();
      }
      
    }

    spawnEnemies();

   
 
    

}

function spawnEnemies(){
  if(soldier.x% 1300 === 0 ){
    var enemy = createSprite(camera.x + 800, 600, 20,50);
    enemy.scale = 0.3
    enemy.addImage("enemy", enemyImage)
    enemy.setCollider("rectangle",-1800,0, 4000,enemy.height)
    enemy.debug = true;

    enemyGroup.add(enemy)

    enemyBullet = createSprite(enemy.x -60,enemy.y-3,10,10)
    enemyBullet.addImage("bulletE",bulletLImage)
    enemyBullet.scale = 0.1;

    enemyBulletGroup.add(enemyBullet)

    return enemyGroup;
  }
  }


function createBullets(){
  bullet = createSprite(soldier.x +60,soldier.y-2,10,10)
  bullet.addImage("bullet",bulletImage)
  bullet.scale = 0.03;
  bullet.velocityX = 30

  bulletGroup.add(bullet)

  return bulletGroup

}





