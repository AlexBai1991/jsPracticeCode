/*
导航一级菜单处于hover状态时候，显示相应的二级菜单
*/
$(function (){
	var $navLis = $(".nav li");
	$navLis.hover(function (){
		$(this).find(".innerNav").show();
	}, function (){
		$(this).find(".innerNav").hide();
	});
});