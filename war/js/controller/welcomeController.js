//welcomeController
App.controller('welcomeController',['$scope','GApi','$rootScope', function($scope,GApi,$rootScope) {
   
	
$scope.go = function ( path ) {
    	window.location.href=path;
  };
  
  

if($rootScope.connecte==true){

	
}
else{		
	$scope.go('#/connexion');
}

}]);