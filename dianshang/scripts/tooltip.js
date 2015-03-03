/*
当鼠标滑动到超链接上，显示相应的提示
*/
$(function (){
	$(".newsCon a").mouseover(function (e){
		this.myTitle = this.title;
		this.title = "";
		$("body").append("<div id='tooltip'>"+this.myTitle+"</div>");
		$("#tooltip").css({
			"top": (e.pageY + 10) + "px",
			"left": (e.pageX + 20) + "px"
		}).show("fast");
	}).mouseout(function (){
		this.title = this.myTitle;
		$("#tooltip").remove();
	}).mousemove(function (e){
		$("#tooltip").css({
			"top": (e.pageY + 10) + "px",
			"left": (e.pageX + 20) + "px"
		})
	});
});