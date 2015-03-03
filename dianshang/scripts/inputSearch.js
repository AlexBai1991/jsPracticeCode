/*
搜索输入框获取焦点时，删除提示；失去焦点时，添加提示；输入搜索词后按回车进行搜索.
*/
$(function (){
	$("#searchInput").focus(function (){
		$(this).addClass("focus");
		if($(this).val() == this.defaultValue){
			$(this).val("");
		}
	}).blur(function (){
		$(this).removeClass("focus");
		if($(this).val() == ""){
			$(this).val(this.defaultValue);
		}
	}).keyup(function (e){
		if(e.which == 13){
			alert("回车提交表单!");
		}
	});
})