app.controller('evntdetailController', ['$scope','$routeParams','$location', '$filter', 'eventFactory', 'commFactory', 'usersFactory', 'toaster',
	function($scope, $routeParams, $location, $filter, eventFactory, commFactory, usersFactory, toaster){

	$scope.user = {};
	$scope.thisevent = {};
	$scope.message = {msg: ''};

	var get_login_session = function(user_id) {
      	usersFactory.login_index(user_id, function (data) {
      		$scope.user = data;

			event_index();
    	});
  	};

  	if(usersFactory.getCookieData()){
    	get_login_session(usersFactory.getCookieData());
  	}
  	else{
  		$location.url('/');
  	}

	//find the event detail from the routeparams
	var event_index = function(){
		eventFactory.get_info($routeParams, function(returndata){
			$scope.thisevent = returndata.data;
			// console.log($scope.thisevent);
			$scope.message = {msg: ''};
		})
	};

	//check if user is a member
	$scope.isMember = function(){
		if (!$scope.thisevent._comm)
			return false;
		return $scope.thisevent._comm.member.indexOf($scope.user._id) > -1;
	};

	$scope.add_msg = function(){
		var sendData = {
			_author: $scope.user._id,
			_event: $scope.thisevent._id,
			msg: $scope.message.msg
		};
		eventFactory.add_msg(sendData, function(err, returndata){
			if (err){
				toaster.pop('error', 'Error', 'Fail post comment.');
			}
			else {
				toaster.pop('success', 'Success', 'Post comment, successfully.');
			}
			event_index();
		});

	};


	$scope.reviewers = [];
	$scope.open_complete_modal = function(){
		var reviewers = [];
		for (var i=0; i<$scope.thisevent.messages.length; i++){
			var msgItem = $scope.thisevent.messages[i];
			var author = msgItem._author;
			if (author._id != $scope.user._id){
				var detailData = {
					_id: author._id,
					name: author._intro.first_name + ' ' + author._intro.last_name,
					review: '',
					rating: 0
				};
				if (reviewers.indexOf(detailData) == -1)
					reviewers.push(detailData);
			}
		}
		$scope.reviewers = reviewers;
		$('#finishModal').modal('show');
	};

	$scope.submit_complete = function(){
		var reviewers = $filter('filter')($scope.reviewers, function(obj){
			return obj.review.trim() != '';
		});
		var postData = {
			eventId: $scope.thisevent._id,
			posterId: $scope.user._id,
			reviews: reviewers
		};
		$('#finishModal').modal('hide');
		eventFactory.complete_event(postData, function(err, result){
			if (err)
				toaster.pop('error', 'Error', 'Fail request.');
			else{
				toaster.pop('success', 'Success', 'Completed Successfully.');
				event_index();
			}
		})
	};

	$scope.reviewData = {
		rating: 0,
		reviewArr: []
	};

	$scope.get_review = function(userItem) {
		eventFactory.get_reviews(userItem._id, function (err, res) {
			if (!err) {
				var reviewArr = res.data,
					arr = [];
				var ratingSum = 0;
				// console.log(reviewArr);
				for (var i = 0; i < reviewArr.length; i++) {
					ratingSum += (reviewArr[i].rating / reviewArr.length);
					arr.push({
						user_name: reviewArr[i]._poster._intro.first_name + reviewArr[i]._poster._intro.last_name,
						review: reviewArr[i].review,
						rating: reviewArr[i].rating
					})
				}
				$scope.reviewData = {
					rating: Math.round(ratingSum),
					reviewArr: arr
				};
				$('#reviewModal').modal('show');
			}
		})
	}

}]);