// 加载已经定义好的模块myModule
var myModule = angular.module("myModule");
myModule.controller("FirstController", function($scope, $parse, $interpolate) {

	$scope.firstName = "白进国";

	$scope.$watch("content", function(newV, oldV, scope) {
		console.log("new:"+newV);
		console.log("old:"+oldV);
		console.log(typeof scope);
		console.log(undefined === undefined);
		if (newV !== oldV) {
			// 用该表达式设置parseFun
			var parseFun = $parse("content");
			console.log(parseFun);
			// 获取经过解析后的表达式的值
			$scope.parseValue = parseFun(scope);
		}
	});
	// 插值字符串
	$scope.$watch("emailBody", function(body) {
		if (body) {
			var template = $interpolate(body);
			$scope.previewText = template({to: $scope.to});
		}
	});

});