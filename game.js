function load_images()
{
    enemy_image=new Image;
    enemy_image.src="virus.png";
    player_image=new Image;
    player_image.src="warrior.png";
    gem_image=new Image;
    gem_image.src="gem.png";
}
function init()
{
    canvas=document.getElementById("mycanvas");
    W=700;
    H=400;
    canvas.width=W;
    canvas.height=H;
    pen=canvas.getContext("2d");
    console.log(pen);
    game_over=false;
    e1={
        x:150,
        y:50,
        w:60,
        h:60,
        speed:20,
    };
     e2={
        x:300,
        y:150,
        w:60,
        h:60,
        speed:30,
    };
     e3={
        x:450,
        y:20,
        w:60,
        h:60,
        speed:40,
    };
    player={
      x:20,
        y: H/2,
        w:60,
        h:60,
        speed:20,
        moving:false,
        health:100,
        
    };
    gem={
        x:W-100,
        y:H/2,
          w:60,
        h:60,
    };
    enemy=[e1,e2,e3];
    canvas.addEventListener('mousedown',function(){
        //console.log("You pressed the mouse");
       player.moving=true;
    });
    canvas.addEventListener('mouseup',function(){
         //console.log("You released the mouse");
       player.moving=false;
    });
    
    
}
function isOverlap(rect1,rect2){
    if (rect1.x < rect2.x + rect2.w-20 &&
   rect1.x + rect1.w-20 > rect2.x &&
   rect1.y < rect2.y + rect2.h-20 &&
   rect1.y + rect1.h-20 > rect2.y) {
    return true
    }
    
    return false;
    
}
function draw()
{
    pen.clearRect(0,0,W,H);
    pen.fillStyle= "red";
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    for(let i=0;i<enemy.length;i++)
    {
    pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    pen.fillText("score"+player.health,10,10);
}
function update()
{   
    if(player.moving==true)
        {
            player.x+=player.speed;
            player.health+=20;
        }
    for(let i=0;i<enemy.length;i++)
        {
            if(isOverlap(player,enemy[i]))
                {
                    player.health-=50;
                    if(player.health<0)
                        {
                            game_over=true;
                            alert("player died before");
                        }
                    
                }
        }
    if(isOverlap(player,gem))
        {
            console.log("you won the game");
            alert("you won the game brooo");
            game_over=true;
            return;
        }
    for(let i=0;i<enemy.length;i++)
    {
    enemy[i].y+=enemy[i].speed;
    if(enemy[i].y>=H-enemy[i].h)
        {
            enemy[i].speed*=-1;
        }
    else if(enemy[i].y<0)
        {
            enemy[i].speed*=-1;
        }
    }
}
function gameloop()
{
    if(game_over==true)
        {
            clearInterval(f);
        }
    draw();
    update();
    console.log("ingameloop");
}
load_images();
init();

var f=setInterval(gameloop,100);