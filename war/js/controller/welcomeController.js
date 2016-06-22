//welcomeController
App.controller('welcomeController',['$scope','GApi','$rootScope', function($scope,GApi,$rootScope) {
   
$scope.subtitle = '\u00e7a se boit ou \u00e7a se mange ? ';
$scope.appName = 'AOC Quizz';
$scope.go = function ( path ) {
    	window.location.href=path;
  };
  
  

if($rootScope.connecte==true){

	
}
else{		
	$scope.go('#/connexion');
}

}]);