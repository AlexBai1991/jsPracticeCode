/*main.js*/

//全局变量
var board = new Array();
var score = 0;
$(function (){
	newgame();
});
/**
*	@开始新的游戏
**/
function newgame(){
	//初始化
	init();
	//在两个格子中随机生成2，4，并显示之
	generateOneNumber();
	generateOneNumber();
}
/**
*	@初始化十六个格子的位置信息和board二维数组
**/
function init(){
	score = 0;
	updateScore(score)
	for(var i=0; i<4; i++){
		board[i] = new Array();
		for(var j=0; j<4; j++){
			board[i][j] = 0;
			var $gridCell = $("#grid-cell-"+i+"-"+j);
			$gridCell.css({
				"left": getPosLeft(i, j),
				"top": getPosTop(i, j)
			});
		}
	}
	updateBoardView();
}
/**
*	@更新显示十六个格子上对应的数字
**/
function updateBoardView(){
	//在每次调用此函数之前，都将之前生成的div删除掉
	$(".number-cell").remove();
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			$("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			var $theNumberCell = $("#number-cell-"+i+"-"+j);
			if(board[i][j] == 0){
				//设置不显示
				$theNumberCell.css({
					"width": "0px",
					"height": "0px",
					"left": getPosLeft(i, j) + 50,
					"top": getPosTop(i, j) + 50
				});
			}else{
				$theNumberCell.css({
					"width": "100px",
					"height": "100px",
					"left": getPosLeft(i, j),
					"top": getPosTop(i, j),
					"background-color": getNumBackgroundColor(board[i][j]),
					"color": getNumColor(board[i][j])
				});
				$theNumberCell.text(board[i][j]);
			}			
		}
	}
}
/**
*	@生成一个随机位置，并且在这个随机位置上生成随机数2或4
**/
function generateOneNumber(){
	if(noSpace(board)){
		return false;
	}
	//随机生成2，4两个数(各以50%的概率)
	var randomNum = (Math.random() < 0.5) ? 2 : 4;
	//随机生成一个位置(x, y)坐标
	var randomX = Math.floor(Math.random()*4);
	var randomY = Math.floor(Math.random()*4);
	var num = 0;
	while(num < 50){
		if(board[randomX][randomY] == 0){
			break;
		}
		randomX = Math.floor(Math.random()*4);
		randomY = Math.floor(Math.random()*4);
		num++;
	}
	if(num == 50){
		//说明经过上次的50次循环，都没有生成合适的位置
		//手动生成一个位置
		var flag = false;
		for(var i=0; i<board.length; i++){
			for(var j=0; j<board[i].length; j++){
				if(board[i][j] == 0){
					flag = true;
					randomX = i;
					randomY = j;
					break;
				}
			}
			if(flag){
				break;
			}
		}
	}
	//在随机位置上显示随机数
	board[randomX][randomY] = randomNum;
	showNumberWithAnimation(randomX, randomY, randomNum);
}
/**
*	@游戏的上下左右操控
**/
$(document).keydown(function (event){
	switch(event.keyCode){
		case 37:  //left
			event.preventDefault();
			if(moveLeft()){
				setTimeout("generateOneNumber()", 230);	
				setTimeout("isGameOver()", 250);		
			}
			break;
		case 38:  //up
			event.preventDefault();
			if(moveUp()){
				setTimeout("generateOneNumber()", 230);	
				setTimeout("isGameOver()", 250);				
			}
			break;
		case 39:  //right
			event.preventDefault();
			if(moveRight()){
				setTimeout("generateOneNumber()", 230);	
				setTimeout("isGameOver()", 250);				
			}
			break;
		case 40:  //down
			event.preventDefault();
			if(moveDown()){
				setTimeout("generateOneNumber()", 230);	
				setTimeout("isGameOver()", 250);				
			}
			break;
		default:
			break;
	}
});
function isGameOver(){
	if(noSpace(board) && noMove(board)){
		alert("game over!");
	}
}
/**
*	@moveLeft
**/
function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}
	//moveLeft
	for(var i=0; i<4; i++){
		var temp = 0;
		for(var j=1; j<4; j++){
			if(board[i][j] != 0){
				for(var k=temp; k<j; k++){
					if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
						//move
						showMoveWithAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)){
						//move
						showMoveWithAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						updateScore(score);
						temp = k + 1;
						break;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}
/**
*	@moveUp
**/
function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
	//moveUp
	for(var j=0; j<4; j++){
		var temp = 0;
		for(var i=1; i<4; i++){
			if(board[i][j] != 0){
				for(var k=temp; k<i; k++){
					if(board[k][j] == 0 && noBlockVertical(j, k, i, board)){
						//move
						showMoveWithAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board)){
						//move
						showMoveWithAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						updateScore(score);
						temp = k + 1;
						break;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}
/**
*	@moveRight
**/
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	//moveRight
	for(var i=0; i<4; i++){
		var temp = 3;
		for(var j=2; j>=0; j--){
			if(board[i][j] != 0){
				for(var k=temp; k>j; k--){
					if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
						//move
						showMoveWithAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;
					}else if(board[i][j] == board[i][k] && noBlockHorizontal(i, j, k, board)){
						showMoveWithAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						updateScore(score);
						temp = k - 1;
						break;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}
/**
*	@moveDown
**/
function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	//moveDown
	for(var j=0; j<4; j++){
		var temp = 3;
		for(var i=2; i>=0; i--){
			if(board[i][j] != 0){
				for(var k=temp; k>i; k--){
					if(board[k][j] == 0 && noBlockVertical(j, i, k, board)){
						showMoveWithAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)){
						showMoveWithAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						updateScore(score);
						temp = k - 1;
						break;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}



