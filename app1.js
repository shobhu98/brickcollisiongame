let canvas=document.getElementById('gameCanvas');

ctx=canvas.getContext('2d');



let ballX=75;
let ballY=75;
let ballspeedX=5;
let ballspeedY=5;
const brickWidth=100;
const brickHeight=75;
const brickCol=8;
const brickRow=3;
const paddleWidth=100;
const  paddleHeight=10
let paddleX=400;
canvas.addEventListener('mousemove',updateMousepos);
function updateMousepos(e){
    var rect=canvas.getBoundingClientRect();
    var root=document.documentElement;
 let MouseX=e.clientX-rect.left-root.scrollLeft;
 let MouseY=e.clientY-rect.top-root.scrollTop;


    paddleX=MouseX-paddleWidth/2;
}


function update() {

    draw();
    move();
}
function drawbricks() {
    for (let j = 0; j <brickRow ; j++) {
        for (let i = 0; i <brickCol ; i++) {
            drawrect(brickWidth*i,brickHeight*j,brickWidth-2,brickHeight-2,'blue');

        }

    }

}
function boolean() {


}
function draw() {
    drawrect(0,0,canvas.width,canvas.height,'black');
    drawrect(paddleX,canvas.height-paddleHeight*2,paddleWidth,paddleHeight,'white');
    drawbricks();

    drawcircle(ballX,ballY,10,0,Math.PI*2,true);

}
function drawrect(x,y,w,h,color) {
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);

}
function drawcircle(x,y,r,start,end,bool) {
    ctx.fillStyle='red';
    ctx.beginPath();
    ctx.arc(x,y,r,start,end,bool);
    ctx.fill();
}
function ballReset() {
    ballX=canvas.width/2;
    ballY=canvas.height/2;

}
function move(){
    ballX+=ballspeedX;
    ballY+=ballspeedY;
    if(ballX>canvas.width){
        ballspeedX*=-1;
    }
    if(ballY>canvas.height){
       ballReset()
    }
    if(ballX<0){
        ballspeedX*=-1;
    }
    if(ballY<0){
        ballspeedY*=-1;
    }




    let paddleAboveY= canvas.height-paddleHeight*2;
    let paddlebelowY=paddleAboveY+paddleHeight;
    let paddleleftedg=paddleX;
    let paddlerightedge=paddleleftedg+paddleWidth;


    if(ballY>paddleAboveY&&ballY<paddlebelowY&&
    ballX>paddleleftedg&& ballX<paddlerightedge){
        ballspeedY*=-1;
        var centerofPaddleX=paddleX+paddleWidth/2;
        var balldistfromcenterx=ballX-centerofPaddleX;
        ballspeedX=balldistfromcenterx*.35;

    }

}

setInterval(update,30);
