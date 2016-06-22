// create the module and name it App
// dépendances : ngRoute, routage ; ngMaterial : API material google
var App = angular.module('App', [ 'angular-google-gapi', 'ngRoute', 'ngMaterial', 'ngMessages']);

// configure our routes
App.config(function($routeProvider) {
	$routeProvider

	// route for the home page
	.when('/home', {
		templateUrl : '/pages/home.html',
		controller : 'mainController'
	})

	// route for the inscription page
	.when('/inscription', {
		templateUrl : '/pages/inscription.html',
		controller : 'registerController'
	})

	// route for the connexion page
	.when('/connexion', {
		templateUrl : '/pages/connexion.html',
		controller : 'loginController'
	})

	// route for the bienvenue page
	.when('/bienvenu', {
		templateUrl : '/pages/bienvenu.html',
		controller : 'welcomeController'
	})

	.when('/play', {
		templateUrl : '/pages/play.html',
		controller : 'playController'
	})
	
	.when('/score', {
		templateUrl : '/pages/score.html',
		controller : 'scoreController'
	})
	
	.when('/import', {
		templateUrl : '/pages/import.html',
		controller : 'importController'
	})
	
	// route for the historique page
	.when('/historique', {
		templateUrl : '/pages/historique.html',
		controller : 'historiqueController'
	})

	.otherwise({
		redirectTo : '/connexion'
	});
});