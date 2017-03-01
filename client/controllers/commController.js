app.controller('commController', ['$scope', '$timeout', '$filter', 'commFactory', 'usersFactory', 'toaster', 'NgMap', function($scope, $timeout, $filter, commFactory, usersFactory, toaster, NgMap){
	//scope variable
	$scope.communities = [];
	$scope.community = {};
	//name: "Admin person", Email: 'admin@admin.com', password: 'adminadmin', ranking: 0
	$scope.user = {};
	$scope.users = [];
	$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPLdzUcX9IEjQXwll1stPmVF3gfLBAiNk";
	var geocoder = new google.maps.Geocoder();

	var get_login_session = function(user_id) {
     	usersFactory.login_index(user_id, function (data) {
      		$scope.user = data;
			// set map center to user's zip code
			geocoder.geocode({address: $scope.user._intro.zipcode}, function(result, status){
				if (status == 'OK'){
					NgMap.getMap().then(function(map){
						map.setCenter(result[0].geometry.location);
					});
				}
			})

		});
 	};

  	if(usersFactory.getCookieData()){
    	get_login_session(usersFactory.getCookieData());
  	}
  	else{
  		// console.log("user not logged in");
  	}

	var comm_index = function(){
		commFactory.retrieve_comm({params: {status: 'Approved'}}, function(returnedata){
			$scope.filterComms = $scope.communities = returnedata.data;
		})
	};
	comm_index();

	$scope.createComm = function(){
		// create a new community
		$scope.community.admin = $scope.user;
		commFactory.create_comm($scope.community, function(err, returnedata){
			$scope.community = {};
			// console.log(returnedata);
			//comm_index();
			if (err)
				toaster.pop('error', 'Error', 'Fail create new community.');
			else
				toaster.pop('success', 'Success', 'Created - Pending Approval.');
		})
	};

	$scope.join_comm = function(comm_id){
		// join to a community
		$scope.join = {comm: comm_id, user: $scope.user._id};
		commFactory.join_comm($scope.join, function(returnedata){
			comm_index();
		})
	};

	$scope.isMember = function(community){
		for(var i = 0; i < community.member.length; i++){
			if(community.member[i]._id == $scope.user._id){
				return true;
			} 
		} 
		return false;
	};

	$scope.isRequest = function(community){
		for(var i = 0; i < community.requester.length; i++){
			if(community.requester[i]._id == $scope.user._id){
				return true;
			} 
		} 
		return false;
	};

	$scope.openModal = function(item){
		$scope.item = item;
		$('#myModal').modal('show');
	};

	function searchByzipCode(commObj){
		// filter and mark to map using zip code
		if (commObj){
			// when click community name in table
			geocoder.geocode({address: commObj.zip_code}, function(result, status){
				if (status == 'OK'){
					NgMap.getMap().then(function(map){
						map.setCenter(result[0].geometry.location);
						$scope.markPoints = [
							{_id: commObj._id, title: commObj.comm_name, lat: result[0].geometry.location.lat(), lng: result[0].geometry.location.lng()}
						]
					});
				}
				else {
				}
			})
		}
		else if ($scope.search_zip_code.val){
			// when click search button
			geocoder.geocode({address: $scope.search_zip_code.val}, function(result, status){
				if (status == 'OK'){
					// console.log(result[0].geometry.location.lat() + ':' + result[0].geometry.location.lng());
					NgMap.getMap().then(function(map){
						map.setCenter(result[0].geometry.location);
						filterByZipcode(result[0].geometry.location);
					});
				}
				else {
					// console.log(status);
				}
			})
		}
		else{
			$scope.filterComms = $scope.communities;
		}
	}

	$scope.search_zip_code = {val: '', limit: 10};
	$scope.searchByZipcode = function(zip_code){
		searchByzipCode(zip_code);
	};

	function getDistance(location1, location2) {
		// calculate distance between two location
		var lat1 = location1.lat(),
			lng1 = location1.lng(),
			lat2 = location2.lat(),
			lng2 = location2.lng();

		function radians(deg){
			return deg * Math.PI / 180;
		}

		return 6378.14 * Math.acos(Math.cos(radians(lat1))*
				Math.cos(radians(lat2))*
				Math.cos(radians(lng2)-radians(lng1))+
				Math.sin(radians(lat1))*
				Math.sin(radians(lat2))) * 0.621371;
	}

	$scope.markPoints = [];

	function filterByZipcode(origin_location){
		// filter community by zipcode and distance
		var markers = [];
		var filterArr = [];
		var confirm_distance = function(index){
			if (index >= $scope.communities.length){
				$scope.markPoints = markers;
				$scope.filterComms = filterArr;
				$timeout(function(){$scope.$apply();}, 100);
				return;
			}
			else {
				var commObj = $scope.communities[index];
				if (commObj.zip_code){
					geocoder.geocode({address: commObj.zip_code}, function(result, status){
						if (status == 'OK'){
							var dis = getDistance(origin_location, result[0].geometry.location);
							// console.log(dis);
							if (dis < 20){ // lesss than 20 mile
								markers.push({_id: commObj._id, title: commObj.comm_name, lat: result[0].geometry.location.lat(), lng: result[0].geometry.location.lng()});
								filterArr.push(commObj);
							}
						}
						confirm_distance(index + 1);
					})
				}
				else
					confirm_distance(index + 1);
			}
		};

		if ($scope.communities.length > 0)
			confirm_distance(0);
	}

	$scope.goAnchor = function(marker){
		// when click marker in map
		$scope.item = ($filter('filter')($scope.communities, {_id: marker._id}))[0];
		$('#myModal').modal('show');
	};

	$scope.currentPage = 1;
	$scope.pageSize = 10;
}])
	.directive('enterKey', function () {
		// directive for press enter key in input box
		return function (scope, element, attrs) {
			element.bind("keydown keypress", function (event) {
				if(event.which === 13) {
					scope.$apply(function (){
						scope.$eval(attrs.enterKey);
					});

					event.preventDefault();
				}
			});
		};
	})
	.directive('convertToNumber', function() {
		// directive for numerical select object
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {
				ngModel.$parsers.push(function(val) {
					return parseInt(val, 10);
				});
				ngModel.$formatters.push(function(val) {
					return '' + val;
				});
			}
		};
	})
	.directive('checkZip', function() {
		// directive for check validate of zip code
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elem, attr, ngModel) {
				ngModel.$validators.zipcode = function(val) {
					var regexp = /^\d{5}(?:[-\s]\d{4})?$/;
					if (val) {
						return regexp.test(val);
					} else {
						return true;
					}
				};
			}
		};
	});