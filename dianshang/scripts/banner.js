/*
banner部分图片轮播效果
*/
$(function (){
	var picNow = 0;
	var timer = null;

	var $banner = $(".banner");
	var $bannerConLis = $(".bannerCon>li");
	var $bannerNavDivs = $(".bannerNav>div");

	$banner.hover(function (){
		//鼠标划入，关闭定时器，图片停止轮播
		clearInterval(timer);
	}, function (){
		//鼠标划出，开启定时器，图片开始轮播
		timer = setInterval(function (){
			if(picNow == $bannerConLis.length){
				picNow = 0;
			}
			showPic(picNow);
			picNow++;
		}, 5000);
	}).trigger("mouseleave");
	
	//鼠标移动到导航框，相应的切换显示图片
	$bannerNavDivs.mouseover(function (){
		picNow = $(this).index();
		showPic(picNow);
	});

});
//自定义函数showPic(index)
function showPic(index){
	$(".bannerCon>li").eq(index).stop(true, true).fadeIn().siblings().fadeOut();
	$(".bannerNav>div").eq(index).addClass("bannerSelected").siblings().removeClass("bannerSelected");
}
