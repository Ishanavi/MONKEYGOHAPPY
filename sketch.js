//declaring variables
var PLAY =1
var END = 0
var gameState = 1
var monkey , monkey_running
var banana1 ,bananaImage 
var obstacle, obstacleImage
var BananaGroup, obstacleGroup
var score,survivalTime
var ground





//loading images
function preload()
{
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png",
 "sprite_2.png","sprite_3.png","sprite_4.png",
 "sprite_5.png","sprite_6.png","sprite_7.png",
 "sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() 
{
  createCanvas(500,400)

  //monkey
  monkey = createSprite(80,340,10,10)
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.12;
  
  //ground
  ground = createSprite(250,380,1000,10)
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)
  
  //groups
  BananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  //score and survival time
  score = 0;
  survivalTime = 0;
  
}


function draw() 
{
  background("lightblue");
  
  //score
  fill("black");
  text("Score: " + score,340,20);
  text("Survival Time: " + survivalTime,190,20)
  
  
  if(gameState === PLAY)
  {
  
  //displaying score using frame rate
  ground.velocityX = -(4 + 3*score/100);
  score = score + Math.round(getFrameRate()/60);
  survivalTime = Math.ceil(frameCount/frameRate())

  
  //making ground symmetrical
  if(ground.x<0)
  {
    ground.x = ground.width/2;
  }
  
  
  //making monkey jump only once
  console.log(monkey.y);
  if(keyDown("space") && monkey.y >= 338 )
  {
    monkey.velocityY = -17;
    
  }
  
  //gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
    
  //creatting banana and rocks
  banana();
  obstacles();
    
    
  
  
    if (obstacleGroup.isTouching(monkey))
    {
      gameState = END;
    }
  
  
  }
  
  
  else if(gameState === END)
  {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    BananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    BananaGroup.setVelocityXEach(0);
   
  }
    
  
  
  drawSprites();
  
  //colliding monkey with ground
  monkey.collide(ground);
  
  
}


//user defined functions
function banana()
{
  if(frameCount % 80 === 0){
    banana1 = createSprite(385,Math.round(random(180,300)),10,10 )
    banana1.addImage("bn",bananaImage)
    banana1.scale = 0.15;
    banana1.velocityX = -3;
    
    //addig lifetime and group
    banana1.lifetime = 130;
    BananaGroup.add(banana1);
  }
}


function obstacles()
{
  if(frameCount % 180 === 0)
  {
    obstacle = createSprite(380,355,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    
    //adding lifetime and group
    obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
    
    
  }
}



