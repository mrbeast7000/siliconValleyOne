var chipsImage, chips2Image, waterImage, canImage, can2Image;
var bgImage, bg;

var chips, chips2, water, can, can2;

var travisGif, travis;

var topBlock;
var bottomBlock;

var garbageGroup;

var totalScore = 0;
var canScore = 0;
var chipsScore = 0;
var waterScore = 0;
var missed = 0;
var garbageSpeed = -4;
var binSize = 0.04;

var playButtonImage, resetButtonImage;
var playButton, resetButton;

var touchMissBlock;

var garbSound;

var gameState = "start";


function preload(){
  travisGif = loadAnimation("dustbin.png");
  chipsImage = loadImage("chips.png");
  chips2Image = loadImage("chips2.png");
  waterImage = loadImage("water.png");
  canImage = loadImage("can.png");
  can2Image = loadImage("can2.png");

  playButtonImage = loadImage("play.png");
  resetButtonImage = loadImage("replay.png");

  bgImage = loadImage("bg1.jpg");

  garbSound = loadSound("garbagePickupSound.mp3");
}

function setup(){
    createCanvas(800,750);
    
    bg = createSprite(580, 435, 5,5);
    bg.addImage(bgImage);
    bg.scale = 2;
    bg.visible = false;

    travis = createSprite(200, 603, 30, 30);
    travis.addAnimation("dustbin", travisGif);
    travis.scale = 0.1;
    travis.setCollider("rectangle", 0,0, 70, 80);
    travis.debug = false;
    travis.visible = false;

    topBlock = createSprite(190, 350, 100, 20);
    topBlock.visible = false;

    bottomBlock = createSprite(190, 790, 100, 20);
    bottomBlock.visible = false;

    playButton = createSprite(375, 550, 1, 1);
    playButton.addImage(playButtonImage);
    playButton.scale = 0.5;
    playButton.visible = false;

    resetButton = createSprite(775, 500, 30, 30);
    resetButton.addImage(resetButtonImage);
    resetButton.scale = 2.5;
    resetButton.visible = false;

    touchMissBlock = createSprite(120, 580, 2, 300);
    touchMissBlock.visible = false;

    rectMode(CENTER);
    canGroup  = new Group();
    can2Group  = new Group();
    chipsGroup  = new Group();
    chips2Group  = new Group();
    waterGroup  = new Group();
    
} 


function draw(){
    background('#B7E9F7');
    
    if(gameState === "start"){
      playButton.visible = true;
      if(mousePressedOver(playButton)){
        gameState = "play";
      } 
      push();
      background("green");
      stroke("white");
      fill("red");
      textSize(40);
      text("Clean City!! Green City!!", 175, 100);
      pop();
      
      push();
      textSize(40);
      stroke("yellow");
      text("Help the trashcan pick up garbage", 90, 250);
      pop();
      
      push();
      stroke("red");
      fill("purple");
      textSize(40);
      text("Press PLAY to play", 210 , 400);
      pop();
        
   }
     
     if(gameState === "play"){
        
        playButton.visible = false;
        travis.visible = true;
        bg.visible = true;
        travis.changeAnimation("walking",travisGif);
        
        bg.velocityX = -3
        if(bg.x<350){
        bg.x = 500;
        }
        if(keyWentDown(UP_ARROW)){
            travis.y = travis.y-10;
        }

        if(keyWentDown(DOWN_ARROW)){
            travis.y = travis.y+10;
        }

        travis.collide(topBlock);
        travis.collide(bottomBlock);
 
        // Spawn Garbage

        if (frameCount % 167 === 0) {
            spawnCanGarbage();
        }
        
        if (frameCount % 183 === 0) {
            spawnCan2Garbage();
        }

        if (frameCount % 198 === 0) {
            spawnChipsGarbage();
        }
        
        if (frameCount % 255 === 0) {
            spawnChips2Garbage();
        }

        if (frameCount % 288 === 0) {
            spawnWaterGarbage();
        }

        // Check Collision

        if(canGroup.isTouching(travis) && keyDown(LEFT_ARROW)){
            increaseCanScore();
            garbSound.play();
            travis.scale += binSize;
        }

        if(can2Group.isTouching(travis) && keyDown(LEFT_ARROW)){
            increaseCan2Score();
            garbSound.play();
            travis.scale += binSize;
        }

        if(chipsGroup.isTouching(travis) && keyDown(LEFT_ARROW)){
            increaseChipsScore();
            garbSound.play();
            travis.scale += binSize;
        }

        if(chips2Group.isTouching(travis) && keyDown(LEFT_ARROW)){
            increaseChips2Score();
            garbSound.play();
            travis.scale += binSize;
        }

        if(waterGroup.isTouching(travis) && keyDown(LEFT_ARROW)){
            increaseWaterScore();
            garbSound.play();
            travis.scale += binSize;
        }
    
    // Missed garbage 
    if(canGroup.isTouching(touchMissBlock)){
         missed += 1 ;
         console.log(missed);
    }

    if(can2Group.isTouching(touchMissBlock)){
         missed += 1 ;
    }

    if(chipsGroup.isTouching(touchMissBlock)){
        missed += 1 ;
    }

    if(chips2Group.isTouching(touchMissBlock)){
        missed += 1 ;
    }

    if(waterGroup.isTouching(touchMissBlock)){
        missed += 1 ;
    }

    if(missed > 70){
        gameState = "end";
    }

    // Display Score
    push();
    textSize(20);
    fill("blue");
    text("Cans Collected:" + canScore, 20,20);
    text("Wrappers Collected:" + chipsScore, 20,50);
    text("Water Bottles Collected:" + waterScore, 550,20);
    fill("red");
    text("Not Collected:" + floor(missed/12), 620,50);
    textSize(40);
    fill("orange");
    text("Press the left arrow", 55, 100);
    text("to collect the trash", 410, 100)
    pop()
  }
  
  if(gameState === "end"){
    
    //Canvas Display
    background("green")  
    touchMissBlock.visible = false;
    playButton.visible = true;
    travis.visible = false;
    bg.visible = false;
    travis.scale = 0.1;

    //destroy garbage groups
    canGroup.destroyEach();
    can2Group.destroyEach();
    chipsGroup.destroyEach();
    chips2Group.destroyEach();
    waterGroup.destroyEach();

    //display score 
      push();
      stroke("black");
      fill("red");
      textSize(30);
      text("You Missed More Than 5 Pieces of Trash!!", 140,100)
      stroke("blue");
      fill("orange");
      textSize(30);
      text("Game Over!! Try again!!", 250, 200);
      totalScore = canScore + chipsScore + waterScore;
      text("Your score: " + totalScore, 300, 300);
      text("Press PLAY to try again", 250, 400);
      pop();

    // Play Again
    if(mousePressedOver(resetButton)){
        gameState = "play";
        totalScore = 0;
        canScore = 0;
        chipsScore = 0; 
        waterScore = 0;
        missed = 0;
     }
  }
    drawSprites();
}

function increaseCanScore(){
    canScore ++;
    canGroup.destroyEach();
}

function increaseCan2Score(){
    canScore ++;
    can2Group.destroyEach();
}

function increaseChipsScore(){
    chipsScore ++;
    chipsGroup.destroyEach();
}

function increaseChips2Score(){
    chipsScore ++;
    chips2Group.destroyEach();
}

function increaseWaterScore(){
    waterScore ++;
    waterGroup.destroyEach();
}

function spawnCanGarbage(){
  can = createSprite(900,random(600,700),1,1);
  can.addImage(canImage);
  can.scale = 0.2;
  can.velocityX = garbageSpeed;
  can.lifetime = 400;
  canGroup.add(can);
}

  
  function spawnCan2Garbage(){
    can2 = createSprite(900,random(600,700),1,1);
    can2.addImage(can2Image);
    can2.scale = 0.2;
    can2.velocityX = garbageSpeed;
    can2.lifetime = 400;
    can2Group.add(can2);
  }

  function spawnChipsGarbage(){
    chips = createSprite(900,random(600,700),1,1);
    chips.addImage(chipsImage);
    chips.scale = 0.2;
    chips.velocityX = garbageSpeed;
    chips.lifetime = 400;
    chipsGroup.add(chips);
  }

  function spawnChips2Garbage(){
    chips2 = createSprite(900,random(600,700),1,1);
    chips2.addImage(chips2Image);
    chips2.scale = 0.2;
    chips2.velocityX = garbageSpeed;
    chips2.lifetime = 400;
    chips2Group.add(chips2);
  }

  function spawnWaterGarbage(){
    water = createSprite(900,random(600,700),1,1);
    water.addImage(waterImage);
    water.scale = 0.2;
    water.velocityX = garbageSpeed;
    water.lifetime = 400;
    waterGroup.add(water);
  }
