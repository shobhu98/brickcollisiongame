let canvas=document.getElementById('gameCanvas');

ctx=canvas.getContext('2d');






let ballX=75;
let ballSpeedX=5;
let ballY=75;
let ballSpeedY=5;
const paddleWidth=100;
const  paddleHeight=10;
let paddleX=400;


const BRICK_W=80;
const BRICK_H=20;
const Brick_col=10;
const Brick_row=14;
 let brickGrid=new Array(Brick_row*Brick_col);
let MouseX;
let MouseY;
brickReset();
canvas.addEventListener('mousemove',updateMousepos);
 function updateMousepos(e){
     var rect=canvas.getBoundingClientRect();
     var root=document.documentElement;
    MouseX=e.clientX-rect.left-root.scrollLeft;
    MouseY=e.clientY-rect.top-root.scrollTop;


    paddleX=MouseX-paddleWidth/2;
}

function brickReset() {

        for (let i = 0; i < Brick_col*Brick_row; i++) {

                brickGrid[i] = true;
            // } else {
            //     brickGrid[i] = false;
            // }

        }



}







function updateAll(){

   drawAll();
   moveAll();


}
function boolean(i,j,k) {
     let tf=k*j+i;
     return tf;


}
function drawBricks() {
    for (let j = 0; j <Brick_row ; j++) {
        for (let i = 0; i <Brick_col ; i++) {
            let tf=boolean(i,j,Brick_col);
            if(brickGrid[tf]){
                colorRect(BRICK_W*i,BRICK_H*j,BRICK_W-2,BRICK_H-2,'blue');
            }
        }
    }




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
    let mouseBrickCol=Math.floor(ballX/BRICK_W);
    let mouseBrickRow=Math.floor(ballY/BRICK_H);

    let brickunderMouse=boolean(mouseBrickCol,mouseBrickRow,10);

    if(brickunderMouse>=0&&brickunderMouse<Brick_col*Brick_row){
        brickGrid[brickunderMouse]=false;
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
