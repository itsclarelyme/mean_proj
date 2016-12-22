var app = angular.module('app', ['ngRoute', 'ngCookies']);

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
	.when('/introduction', {
		templateUrl: "partials/introduction.html", 
		controller: "IntroController"
	})
	.when('/comms', {
		templateUrl: "partials/community.html", 
		controller: "commController"
	})
	.when('/comm/:id', {
		templateUrl: "partials/comm.html", 
		controller: "communityController"
	})
	.when('/mycomm', {
		templateUrl: "partials/mycomm.html", 
		controller: "mycommController"
	})
	.when('/newpost/:id', {
		templateUrl: "partials/newevent.html", 
		controller: "eventController"
	})
	.when('/event/:id', {
		templateUrl: "partials/event_detail.html", 
		controller: "evntdetailController"
	})
	.otherwise({
		redirectTo: '/comms'
	})
})

// app.config(function (ngIntlTelInputProvider) {
//         ngIntlTelInputProvider.set({defaultCountry: 'us'});
// })