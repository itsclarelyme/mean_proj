var app = angular.module('app', ['ngRoute', 'ngMessages', 'ngCookies', 'ngValid']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: "partials/main.html", 
		controller: "mainController"
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
		controller: "CommunitiesController"
	})
	.otherwise({
		redirectTo: '/'
	})
})

