var chipsImage, chips2Image, waterImage, canImage, can2Image;
var bgImage, bg;

var chips, chips2, water, can, can2;

var travisGif, travis;

var topBlock;
var bottomBlock;

var garbageGroup;

var score = 0;
var missed = 0;

var playButtonImage, resetButtonImage;
var playButton, resetButton;

var touchMissBlock;

var garbSound;

var gameState = "play";


function preload(){
  travisGif = loadAnimation("travis.gif");
  chipsImage = loadImage("chips.png");
  chips2Image = loadImage("chips2.png");
  waterImage = loadImage("water.png");
  canImage = loadImage("can.png");
  can2Image = loadImage("can2.png");

  playButtonImage = loadImage("play.png");
  resetButtonImage = loadImage("replay.png");

  bgImage = loadImage("without watermark.jpg");

  garbSound = loadSound("garbagePickupSound.mp3");
}

function setup(){
    createCanvas(displayWidth, displayHeight);

    bg = createSprite(500, 0, 50,80);
    bg.addImage(bgImage);
    bg.scale = 4;
    
    travis = createSprite(200, 593, 30, 30);
    travis.addAnimation("walking", travisGif);
    travis.scale = 0.8;
    travis.setCollider("rectangle", 0,0, 70, 300);
    travis.debug = false;

    topBlock = createSprite(190, 350, 100, 20);
    topBlock.visible = false;

    bottomBlock = createSprite(190, 790, 100, 20);
    bottomBlock.visible = false;

    playButton = createSprite(770, 600, 30, 30);
    playButton.addImage(playButtonImage);
    playButton.scale = 0.5;

    resetButton = createSprite(775, 500, 30, 30);
    resetButton.addImage(resetButtonImage);
    resetButton.scale = 2.5;

    touchMissBlock = createSprite(-100, 600, 30, 300);

    garbageGroup = new Group();
} 

function draw(){
     background("green");

     if(gameState === "start"){
      push();
      background("green");
      stroke("red");
      fill("red");
      textSize(40);
      text("The Green Earth", 625, 100);
      pop();
      
      playButton.visible = true;
      travis.visible = false;
      bg.visible = false;
      resetButton.visible = false;
  
      if(mousePressedOver(playButton)){
       gameState = "play";
      } 
     }

     if(gameState === "play")
      {
        travis.visible = true;
        bg.visible = true;
        bg.depth -= 1;
        console.log(bg.depth);
        playButton.visible = false;
        resetButton.visible = false;
        
        
        stroke("purple");
        fill("purple");
        textSize(35);
        text("Score = " + score, 1000, 80);
        text("Missed = " + missed, 1000, 130);
        

        
        stroke("red");
        fill("purple");
        textSize(50);
        text("Press the left arrow to pick up garbage", 300 , 100);
        

        

        if(bg.x < 350){
          bg.x = bg.width*1.5;
        }

        bg.velocityX = -5 -(3 + score/2);

        if(keyWentDown(UP_ARROW)){
            travis.velocityY = -3;
        }

        if(keyWentDown(DOWN_ARROW)){
            travis.velocityY = 3;
        }

        travis.collide(topBlock);
        travis.collide(bottomBlock);
 
        spawnGarbage();

     if(garbageGroup.isTouching(travis) && keyDown(LEFT_ARROW)){
        //gameState = "end";
        score += 1;
        //playSound("garbagePickupSound.mp3", true);
        garbageGroup.destroyEach();
       }
     
     if(garbageGroup.isTouching(touchMissBlock)){
       missed += 1;
     }
     
     if(missed === 3){
       gameState = "end";
     }

    //console.log(windowHeight);
  }

    //  push();
    //  stroke("purple");
    //  fill("purple");
    //  textSize(35);
    //  text("Score = " + score, 1250, 80);
    //  text("Missed = " + missed, 1250, 130);
    //  pop();

    //  push();
    //  stroke("red");
    //  fill("purple");
    //  textSize(50);
    //  text("Press the left arrow to pick up garbage", 300 , 100);
    //  pop();

     if(gameState === "end"){
      background("orange");
      push();
      stroke("blue");
      fill("blue");
      textSize(50);
      text("Game Over, try again", 525, 200);
      text("Your score was " + score, 550, 300)
      pop();

      garbageGroup.destroyEach();

      resetButton.visible = true;
      bg.visible = false;
      travis.visible = false;

      if(mousePressedOver(resetButton)){
         gameState = "play";
         score = 0;
         missed = 0;
      }
    }
  
    drawSprites();
}

function spawnGarbage(){
  if(frameCount % 60 === 0){
    var obstacle = createSprite(1500,700,10,40);
    obstacle.scale = 0.3;
    obstacle.velocityX = -5 -(3 + score/2);
    obstacle.y = Math.round(random(500, 750));

    var rand = Math.round(random(1,5));
    switch(rand){
      case 1: 
             obstacle.addImage(canImage);
             break;
      case 2: 
             obstacle.addImage(can2Image);
             break;
      case 3: 
             obstacle.addImage(waterImage);
             break;
      case 4: 
             obstacle.addImage(chipsImage);
             break;
      case 5: 
             obstacle.addImage(chips2Image);
             break;
      default: break;
    }
  garbageGroup.add(obstacle);
  }
}
