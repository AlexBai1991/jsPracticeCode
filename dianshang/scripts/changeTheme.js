/*
点击换肤按钮，修改相应的皮肤样式
*/
$(function (){
	var $themes = $(".sheme>li");
	$themes.click(function (){
		var i = $themes.index($(this)); 
		$(this).addClass("selected").siblings().removeClass("selected");
		$("#changeTheme").attr("href", "styles/themes/theme"+i+".css");
	});
});