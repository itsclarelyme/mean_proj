app.controller('mainController', ['$scope', 'Factory', function($scope, Factory){
	//scope variable
	$scope.items = [];
	$scope.item = {};

	var index = function(){
		Factory.retrieve(function(returnedata){
			$scope.items = returnedata.data;
			console.log($scope.items);
		})
	}
	index();









}]);