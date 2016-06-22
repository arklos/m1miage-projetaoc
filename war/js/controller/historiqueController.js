//historiqueController
App.controller('historiqueController',['$scope','GApi','$rootScope',function($scope,GApi,$rootScope) {

$scope.go = function ( path ) {
    window.location.href=path;
  };
  
  
if($rootScope.connecte==true){
	 console.log("Affichage de l'historique");
	 $scope.scoreLoaded = false;  

	var param={};
	param["identifiant"]=$rootScope.Utilisateur.profilId;
	GApi.execute('historiqueentityendpoint', 'listeUtilisateurScoreEntity',param).then( function(response) {	        
	$scope.scoreLoaded = true;  	 			
	$scope.listeScore=response.result.items;
	console.log("Succés-recuperation de l'historique");

	 }, function() {
	     
	 });

}
else{		
	$scope.go('#/connexion');
}

//Redirection vers l'accueil
$scope.onAccueil = function () {
	$scope.go('#/home');
  };

}]);