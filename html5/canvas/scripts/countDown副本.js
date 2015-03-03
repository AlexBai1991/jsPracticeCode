/*
*	countDown.js
*/

//全局变量
var WINDOW_WIDTH = 1200;
var WINDOW_HEIGHT = 700;
var RADIUS = 8;
var MARGIN_LEFT = 60;
var MARGIN_TOP = 40;
var timer = null;

var curShowTimeSeconds = 0;

window.onload = function (){
	var canvas = document.getElementById("canvas");
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	if(canvas.getContext){
		var context = canvas.getContext("2d");
		curShowTimeSeconds = getCurrentShowTimeSeconds();
		//函数调用
		timer = setInterval(function (){

			render(context);
			update();
		}, 50);
	}
};
function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	if(curShowTimeSeconds != nextShowTimeSeconds){
		curShowTimeSeconds = nextShowTimeSeconds;
	}

}
function getCurrentShowTimeSeconds(){
	var date = new Date();
	var seconds = date.getTime();
	return seconds;
}

/**
*	@ 绘制倒计时的数字时钟图形
*	cxt: 2D绘图上下文context
**/
function render(cxt){
	cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	//获得现在的时间
	var date = new Date(curShowTimeSeconds);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	// var hours = 12;
	// var minutes = 23;
	// var seconds = 56;


	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt);					//绘制小时的十位数
	renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), cxt);	//绘制小时的个位数
	renderDigit(MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, 10, cxt);  				//绘制时钟冒号":"
	renderDigit(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10), cxt)	//绘制分钟的十位数
	renderDigit(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10), cxt)	//绘制分钟的个位数
	renderDigit(MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, 10, cxt);  				//绘制时钟冒号":"
	renderDigit(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10), cxt)	//绘制秒钟的十位数
	renderDigit(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10), cxt)	//绘制秒钟的个位数

}
/**
*	@ 绘制时钟图形中的每一个数字形状
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
				cxt.arc(x + (RADIUS+1) + j*2*(RADIUS+1), y + (RADIUS+1) + i*2*(RADIUS+1), RADIUS, 0, 2*Math.PI);
				cxt.closePath();
				cxt.fillStyle = "#37A7D7";
				cxt.fill();
			}
		}
	}
}