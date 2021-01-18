var runner, noMaskPpl, ground, groundToJumpOver, virus, chance, upperGround, frameArrNoMask, frameArrRandNoMask, personSneeze;
var frameArrSneezePerson, frameArrRandSneezePerson, sneeze, upperGroundGrp; var score=0 ;
var noMaskGrp, sneezeGrp;
var upperGroundArr, upperGround2Arr, upperGround2;
var gameState = "play";
var sanPowerUp, frameArr;
var upperArrRand;
var san;
var immunity= false;
var tallestGroundGrp;
var x=0, y =0, z = 0;
var runningAni;

upperGroundArr = [200, 350, 760];
//frameArrNoMask = [96+30, 367+50, 0+40]; //blue
upperGround2Arr = [300, 450, 863];
//frameArrSneezePerson = [96, 367, 0]; //red
frameArrNoMask = [x+100,y+300,z+50]//blue
frameArrSneezePerson = [x+200,y+y+400,z+150] //red

function preload()
{
    runningAni = loadAnimation("r1.jpg", "r2.jpg");
}

function setup()
{
    createCanvas(800, 600);

    ground = createSprite(400, 590, 1600, 20);
    //ground.debug = true;

    runner = createSprite(100, 500, 50, 50);
    runner.addAnimation("run", runningAni);
    
    ground.velocityX = -2;

    sneezeGrp = new Group();
    noMaskGrp = new Group();
    upperGroundGrp = new Group();
    tallestGroundGrp = new Group();
}

function draw()
{
    score = Math.round(frameCount/30);
    background(0);
    textSize(20);
    fill("red");
    text(score, 700, 70);
    runner.collide(ground);
    runner.collide(upperGroundGrp);
    runner.collide(tallestGroundGrp)
    if(gameState==="play"){
        runner.collide(upperGroundGrp);
        if(runner.x<100)
        {
            runner.x = 100;
        }
        if(noMaskGrp.isTouching(runner)&& immunity === false) 
            {
                 // gameState = "lose";
                console.log("it touched");
            } 
        if(sneezeGrp.isTouching(runner) && keyDown("Q")===false && immunity === false)
        {
            //gameState = "lose";
            console.log("sneeze");
        }
        if(keyDown("Q")&& sneezeGrp.isTouching(runner))
        {
            for(var i =0; i<sneezeGrp.length; i++)
            {
                if(sneezeGrp.get(i).isTouching(runner))
                {
                    sneezeGrp.get(i).destroy();
                    console.log("hakuna matata");
                }
            }
        }

    
        runner.velocityY += 3;

        if(keyDown("F") && runner.y >= 200)
        {
            runner.velocityY = -43;
        }
        if((keyDown("space")  || touches.length > 0 && runner.y >= 550) )
        {
            runner.velocityY = -30;
            console.log("jump");
        }
   
        if(ground.x<0)
        {
            ground.x = ground.width/2;
        }    
        createNoMaskPpl();
        createUpperGroud();
        createPersonSneeze();

        drawSprites();
    }
}

function createNoMaskPpl ()
{
    frameArrRandNoMask = random(frameArrNoMask);
    if(frameCount%frameArrRandNoMask===0)
    {
        noMaskPpl= createSprite(800, 560, 25, 25);
        noMaskPpl.collide(ground);
        noMaskPpl.velocityX = -4;
        noMaskGrp.add(noMaskPpl);
        noMaskPpl.debug = true;
        noMaskPpl.liftime = 250;
        noMaskPpl.shapeColor = 'blue';
    }
}

function createUpperGroud()
{
    upperArrRand = random(upperGroundArr);
    if(frameCount%upperArrRand===0)
    {
        upperGround = createSprite(800, 360, 400, 20);
        upperGround.velocityX = -3;
        upperGroundGrp.add(upperGround);
        setTimeout(tallestGround, 2000);

    }
   /* if(frameCount%upperArrRand+50===0)
    {
        //HOW TO MAKE THE SECOND ONE WAIT FOR 30 FRAMES
        
    } */
}
function tallestGround()
{
    upperGround2 = createSprite(800, 220, 400, 20);
    upperGround2.velocityX = -3;
    upperGround2.shapeColor= "green";
    tallestGroundGrp.add(upperGround2);
}
function createPersonSneeze ()
{
    frameArrRandSneezePerson = random(frameArrSneezePerson);
    if(frameCount%frameArrRandSneezePerson===0)
    {
        personSneeze = createSprite(800, 560, 25, 25);
        personSneeze.collide(ground);
        personSneeze.velocityX = -4;
        personSneeze.shapeColor = "red";
        personSneeze.lifetime = 250;
        sneeze = createSprite(personSneeze.x, personSneeze.y, 10, 10);
        sneeze.lifetime = 250;
        sneeze.velocityX = -6;
        sneezeGrp.add(sneeze);
        

    }

}

function SanPowerUp()
{
    immunity = true;
    san = createSprite(800, 215, 10, 10);
    san.velocityX = -3;
    if(runner.isTouching(san))
    {
        immunity = true;
    }
}


/*  1. fix the tallest ground issue(doesnt jump once on upperground)
    2. sliding feature
    3. make animations
    4.fix the numbers so that the enemies dont come up so often
    */
