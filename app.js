let canvas=document.getElementById('gameCanvas');

ctx=canvas.getContext('2d');






let ballX=75;
let ballSpeedX=5;
let ballY=75;
let ballSpeedY=5;
const paddleWidth=100;
const  paddleHeight=10;
let paddleX=400;

const BRICK_W=100;
const BRICK_H=50;
const Brick_count=4;
canvas.addEventListener('mousemove',updateMousepos);
 function updateMousepos(e){
     var rect=canvas.getBoundingClientRect();
     var root=document.documentElement;
    var MouseX=e.clientX-rect.left-root.scrollLeft;

    paddleX=MouseX-paddleWidth/2;
}




function updateAll(){

   drawAll();
   moveAll();


}
function drawBricks() {
     colorRect(0,0,BRICK_W,BRICK_H,'blue');

}
function ballReset(){
     ballX=canvas.width/2;
     ballY=canvas.height/2;
}
let framesPersecond=30;
setInterval(updateAll,1000/framesPersecond);

function drawAll() {
   colorRect(0,0,canvas.width,canvas.height,'black');
   colorRect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight,'white');
   colorball(ballX,ballY,10,0,Math.PI*2,true);
   drawBricks();



}
function colorRect(topLeftX,topLeftY,boxWidth,boxHeight,fillcolor) {
    ctx.fillStyle=fillcolor;
    ctx.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
}
function colorball(centerX,centerY,radius,start,end,anti) {
    ctx.fillStyle='red';
    ctx.beginPath();
    ctx.arc(centerX,centerY,radius,start,end,anti);
    ctx.fill();

}
function moveAll() {
    ballX+=ballSpeedX;
    ballY+=ballSpeedY;
    console.log(ballX);
    if(ballX>canvas.width){
        ballSpeedX*=-1;
    }
    if(ballX<0){
        ballSpeedX*=-1;
    }
    if(ballY>canvas.height){
        // ballSpeedY*=-1;
        ballReset();
    }
    if(ballY<0){

        ballSpeedY*=-1;
    }
    let paddleAboveY= canvas.height-paddleHeight;
    let paddlebelowY=paddleAboveY+paddleHeight;
    let paddleleftedg=paddleX;
    let paddlerightedge=paddleleftedg+paddleWidth;


    if(ballY>paddleAboveY&&ballY<paddlebelowY&&
    ballX>paddleleftedg&& ballX<paddlerightedge){
        ballSpeedY*=-1;
        var centerofPaddleX=paddleX+paddleWidth/2;
        var balldistfromcenterx=ballX-centerofPaddleX;
        ballSpeedX=balldistfromcenterx*.35;
    }

}
