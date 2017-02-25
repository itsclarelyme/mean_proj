var app = angular.module('app', ['ngRoute', 'ngMessages', 'ngCookies', 'ngValid', 'ngFileUpload', 'ngAnimate', 'toaster', 'angular-input-stars', 'ngMap', 'angularUtils.directives.dirPagination']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: "partials/community.html", 
		controller: "commController"
	})
	.when('/register', {
		templateUrl: "partials/registration.html", 
		controller: "LoginController"
	})
	.when('/login', {
		templateUrl: "partials/login.html", 
		controller: "LoginController"
	})
	.when('/logout', {
		templateUrl: "partials/login.html", 
		controller: "LogoutController"
	})
	.when('/introduction/:id', {
		templateUrl: "partials/introduction.html", 
		controller: "IntroController"
	})
	.when('/comms', {
		templateUrl: "partials/community.html", 
		controller: "commController"
	})
	.when('/comm/manage/:id', {
		templateUrl: "partials/comm_manage.html",
		controller: "commManageController"
	})
	.when('/comm/join/:id', {
		templateUrl: "partials/comm_join.html",
		controller: "commJoinController"
	})
	.when('/mycomm', {
		templateUrl: "partials/mycomm.html", 
		controller: "mycommController"
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: "DashboardController"
	})
	.when('/newpost/:id', {
		templateUrl: "partials/newevent.html", 
		controller: "eventController"
	})
	.when('/event/:id', {
		templateUrl: "partials/event_detail.html", 
		controller: "evntdetailController"
	})
	.when('/admin-dashboard', {
		templateUrl: 'partials/admin_dashboard.html',
		controller: "AdminDashboardController"
	})
	.otherwise({
		redirectTo: '/comms'
	})
});