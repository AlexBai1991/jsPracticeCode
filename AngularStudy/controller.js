// 定义模块
var myModule = angular.module("myModule", []);
myModule.controller('HelloAngularController', 
	function($scope) {
		$scope.Person = {
			name: "白进国",
			age: 24,
			add: "山东菏泽"
		};

		$scope.todoList = [
      		{text:'learn angular', done:true},
      		{text:'build an angular app', done:false}
      	];
 
    	$scope.addTodo = function() {
      		$scope.todoList.push({text:$scope.todoText, done:false});
	      	$scope.todoText = '';
	    };
 
    	$scope.remaining = function() {
      		var count = 0;
      		angular.forEach($scope.todoList, function(todo) {
        		count += todo.done ? 0 : 1;
      		});
      		return count;
    	};
	 
	    $scope.archive = function() {
    	 	var oldTodos = $scope.todoList;
	      	$scope.todoList = [];
	      	angular.forEach(oldTodos, function(todo) {
	        	if (!todo.done) $scope.todoList.push(todo);
	      	});
	    };


	    // 指令相关
	    $scope.reset = function() {
	    	$scope.content = "内容可编辑";
	    };
	}
).directive("contenteditable", function() {
	return {
		require: "ngModel",
		link: function(scope, element, attr, ngModel) {
			function setVal() {
				ngModel.$setViewValue(element.text());
			}
			// view => model
			element.bind("keyup", function() {
				scope.$apply(setVal);
			});
			// model => view
			ngModel.$render = function(val) {
				console.log("render running");
				element.html(val);
			}
			// init
			setVal();
		}
	};
});