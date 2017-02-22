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
			geocoder.geocode({address: $scope.user._intro.zipcode}, function(result, status){
				console.log(result);
				console.log(status);

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
  		console.log("user not logged in"); 
  	}

	var comm_index = function(){
		commFactory.retrieve_comm({params: {status: 'Approved'}}, function(returnedata){
			$scope.filterComms = $scope.communities = returnedata.data;
		})
	};
	comm_index();

	$scope.createComm = function(){
		$scope.community.admin = $scope.user;
		commFactory.create_comm($scope.community, function(err, returnedata){
			$scope.community = {};
			console.log(returnedata);
			//comm_index();
			if (err)
				toaster.pop('error', 'Error', 'Fail create new community.');
			else
				toaster.pop('success', 'Success', 'Created - Pending Approval.');
		})
	};

	$scope.join_comm = function(comm_id){
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

	$scope.search_zip_code = {val: ''};
	$scope.searchByZipcode = function(){
		geocoder.geocode({address: $scope.search_zip_code.val}, function(result, status){
			if (status == 'OK'){
				console.log(result[0].geometry.location.lat() + ':' + result[0].geometry.location.lng());
				NgMap.getMap().then(function(map){
					map.setCenter(result[0].geometry.location);
					filterByZipcode(result[0].geometry.location);
				});
			}
			else {
				console.log(status);
			}
		})
	};

	function getDistance(location1, location2) {
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
							console.log(dis);
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
		$scope.item = ($filter('filter')($scope.communities, {_id: marker._id}))[0];
		$('#myModal').modal('show');
	};
}]);