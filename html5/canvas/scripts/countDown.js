/*
*	countDown.js，实现画布上的时钟倒计时效果
*	扩展为绚丽时钟效果
*/

//全局变量】【也可以进行设置屏幕的自适应】
var WINDOW_WIDTH = 1200;
var WINDOW_HEIGHT = 600;
var RADIUS = 8;
var MARGIN_LEFT = 60;
var MARGIN_TOP = 40;
var timer = null;

var curShowTimeSeconds = 0;
var endTime = new Date(2015,1,20,12,10,0);	//设定倒计时日期
var balls = [];								//已过去时间数的小球集合数组
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function (){
	var canvas = document.getElementById("canvas");
	//设置屏幕自适应相关变量
	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.body.clientHeight;
	alert(WINDOW_HEIGHT);
	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
	RADIUS = Math.round(WINDOW_WIDTH*4/5/108) - 1;  

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	if(canvas.getContext){
		var context = canvas.getContext("2d");
		curShowTimeSeconds = getCurrentShowTimeSeconds();
		//函数调用
		timer = setInterval(function (){

			render(context);
			update();
			console.log(balls.length);
		}, 50);
	}
};
/**
*	@获取当前时间距离endTime的时间秒数
**/
function getCurrentShowTimeSeconds(){
	var date = new Date();
	// var seconds = Math.round((endTime.getTime() - date.getTime())/1000);
	// return seconds < 0 ? 0 : seconds;
	var seconds = date.getHours()*3600 + date.getMinutes()*60 + date.getSeconds();
	return seconds;
}
/**
*	@更新当前的倒计时时间
**/
function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt(nextShowTimeSeconds%3600/60);
	var nextSeconds = nextShowTimeSeconds%60;

	var curHours = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt(curShowTimeSeconds%3600/60);
	var curSeconds = curShowTimeSeconds%60;

	if(curSeconds != nextSeconds){
		curShowTimeSeconds = nextShowTimeSeconds;
		if(parseInt(curHours/10) != parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT + (RADIUS+1), MARGIN_TOP, parseInt(curHours/10));
		}
		if(parseInt(curHours%10) != parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(curHours%10));
		}
		if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
			addBalls(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
			addBalls(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes%10));
		}
		if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
			addBalls(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
			addBalls(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds%10));
		}
	}
	updateBalls();
}
/**
*	@将刚刚过去的时间数num表示的小球添加进全局数组balls
*	x: 时间数的起始x坐标
*	y: 时间数的起始y坐标
*	num: 具体的显示时间数
**/
function addBalls(x, y, num){
	for(var i=0; i<digit[num].length; i++){
		for(var j=0; j<digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x: x + (RADIUS+1) + j*2*(RADIUS+1),
					y: y + (RADIUS+1) + i*2*(RADIUS+1),
					vx: Math.pow(-1, Math.floor(Math.random()*1000))*4,
					vy: -5,
					g: 1.5 + Math.random(),
					color: colors[Math.floor(Math.random()*colors.length)]
				};
				balls.push(aBall);
			}
		}
	}
}
/**
*	@更新存进全局数组balls中的每个小球的x,y位置状态，让小球运动
**/
function updateBalls(){
	var existBallNum = 0;

	for(var i=0; i<balls.length; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy*0.75;
		}
		//小球x坐标位置检测，当小球不处在画面中时，删除balls数组中相应的小球
		if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){
			balls[existBallNum++] = balls[i];
		}
	}
	while(balls.length > Math.min(300, existBallNum)){
		balls.pop();
	}
}
/**
*	@绘制倒计时的数字时钟图形
*	cxt: 2D绘图上下文context
**/
function render(cxt){
	cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	//获得现在的时间距离倒计时时间的时分秒信息
	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt(curShowTimeSeconds%3600/60);
	var seconds = curShowTimeSeconds%60;

	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt);					//绘制小时的十位数
	renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), cxt);	//绘制小时的个位数
	renderDigit(MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, 10, cxt);  				//绘制时钟冒号":"
	renderDigit(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10), cxt)	//绘制分钟的十位数
	renderDigit(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10), cxt)	//绘制分钟的个位数
	renderDigit(MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, 10, cxt);  				//绘制时钟冒号":"
	renderDigit(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10), cxt)	//绘制秒钟的十位数
	renderDigit(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10), cxt)	//绘制秒钟的个位数

	//绘制balls中的每个小球
	for(var i=0; i<balls.length; i++){
		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, false);
		cxt.closePath();
		cxt.fillStyle = balls[i].color;
		cxt.fill();
	}
}
/**
*	@绘制时钟图形中的每一个数字形状
*	x: 开始绘制数字图形的起始x坐标
*	y: 开始绘制数字图形的起始y坐标
*	num: 具体要绘制的数字
*	cxt: 2D绘图上下文context	
**/
function renderDigit(x, y, num, cxt){
	for(var i=0; i<digit[num].length; i++){
		for(var j=0; j<digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				var arcX = x + (RADIUS+1) + j*2*(RADIUS+1);
				var arcY = y + (RADIUS+1) + i*2*(RADIUS+1);
				cxt.arc(arcX, arcY, RADIUS, 0, 2*Math.PI);
				cxt.closePath();
				cxt.fillStyle = "#37A7D7";
				cxt.fill();
			}
		}
	}
}