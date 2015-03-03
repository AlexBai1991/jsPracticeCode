/*showAnimation.js*/
function showNumberWithAnimation(x, y, number){
	$theNumberCell = $("#number-cell-"+x+"-"+y);

	$theNumberCell.css("background-color", getNumBackgroundColor(number));
	$theNumberCell.css("color", getNumColor(number));
	$theNumberCell.text(number);
	if(!$theNumberCell.is(":animated")){
		$theNumberCell.animate({
			width: "100px",
			height: "100px",
			left: getPosLeft(x, y),
			top: getPosTop(x, y)
		}, 50);
	}
}
function showMoveWithAnimation(fromx, fromy, tox, toy){
	var $moveNumberCell = $("#number-cell-"+fromx+"-"+fromy);
	if(!$moveNumberCell.is(":animated")){
		$moveNumberCell.animate({
			left: getPosLeft(tox, toy),
			top: getPosTop(tox, toy)
		}, 200);
	}
}
function updateScore(score){
	$("#score").text(score);
}