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

var visiblity = 255

var bgImg;

var enemyExists = "false"


function preload() {
  //bgImg = loadImage("sprites/winter_1.jpg") 
  soldierRImage = loadImage("sprites/SOLDIER_Right.png")
  enemyImage = loadImage("sprites/SOLDIER_Left.png")
  bulletImage = loadImage ("sprites/bullet.png")
  bulletLImage = loadImage ("sprites/BulletLeft.png")
}

function setup(){
    var canvas = createCanvas(1200,600);

    x2 = width;


    engine = Engine.create();
    world = engine.world;

    // bg = createSprite(1150,200,2000,800)
    // bg.addImage("bg",winterbg)
    // bg.scale = 2.5

    edge = createSprite(0,500,20,500)

    soldier = createSprite(250,500,30,30)
    soldier.addImage("sr",soldierRImage)
    soldier.scale = 0.3
    soldier.debug = true;
    soldier.setCollider("rectangle", -100 ,0 ,200,500)

    ground = createSprite(800,590,3600,20)
    ground.visible = true

    

    inviGroup = new Group();
    enemyGroup = new Group();
    bulletGroup = new Group();
    enemyBulletGroup = new Group();

       

}



function draw(){
     background(0);

 
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
    camera.position.x = soldier.x +300
 

    if(soldier.x % 1000 === 0 ){
      platform.push(new Platform (camera.x+800,random(400,500),200,20))

      for(var i=0;i<platform.length;i++){
      invisiblePlatform = createSprite(camera.x+800,platform[i].body.position.y,400,20)
      invisiblePlatform.shapeColor = "brown"
      
      
      platform.pop();
      
      inviGroup.add(invisiblePlatform)
      inviGroup.setLifetimeEach(1000);
      

      
      
      }
       
    }
    

    if(keyWentDown("s")){
      createBullets();

    }

    if(bulletGroup.isTouching(enemyGroup)){
      enemyGroup.destroyEach();
      bulletGroup.destroyEach();
      enemyBulletGroup.destroyEach();
      enemyExists = "false"
    }


    for(var  i=0; i< enemyGroup.length; i++){
    if(enemyGroup.get(i).x -soldier.x < 1000 ){
      enemyGroup.get(i).velocityX= -3
    
      if(frameCount% 50===0){
      createEnemyBullet();
      } 
    }else {
        enemyGroup.setVelocityXEach(0)
      }
        
  

  }

    spawnEnemies();

   
 
    

}

function spawnEnemies(){
  if(soldier.x% 1300 === 0 && enemyExists === "false"){
    var enemy = createSprite(camera.x + 800, 510, 20,50);
    enemy.scale = 0.3
    enemy.addImage("enemy", enemyImage)
    enemy.setCollider("rectangle",100,0, 200,enemy.height)
    enemy.debug = true;
    enemyExists = "true"

    enemyGroup.add(enemy)

    

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

function createEnemyBullet() {
  for(var  i=0; i< enemyGroup.length; i++){
  enemyBullet = createSprite(enemyGroup.get(i).x,enemyGroup.get(i).y-3,10,10)
  enemyBullet.addImage("bulletE",bulletLImage)
  enemyBullet.scale = 0.1;
  enemyBullet.velocityX = -30

  enemyBulletGroup.add(enemyBullet)
  }
}

function spawnAccessories() {
  if(soldier.x% 2000 === 0){
    var rand = Math.round (random(1,2))
    if(rand === 1){
    accessories = createSprite()
    }
  }
}




