//scoreController
App.controller('scoreController',['$scope','GApi','$rootScope', function($scope,GApi,$rootScope) {
	
	//Redirection
	$scope.go = function ( path ) {
	    	window.location.href=path;
	  };
	  
    $scope.listeUtilisateur="";
    $scope.scoreLoaded = false;
    //On v�rifie que utilisateur est connecte 
	if($rootScope.connecte==true){

		   //On recupere la liste des utilisateurs
		   GApi.execute('utilisateurentityendpoint', 'listUtilisateurEntity').then( function(response) {
			   $scope.scoreLoaded = true;
			   
			   for (var i=0 ; i < response.result.items.length ; i++){
	          	   
	 				if(typeof(response.result.items[i].image)=="undefined"){
  	   
	 					response.result.items[i].image="/img/images/user.jpg";  
	 				}
			 	
			   }
	 				 //On r�cupere la liste des utilisateurs
	 			   $scope.listeUtilisateur=response.result.items;
	 			   $scope.listeUtilisateur.sort(function compare(a,b) {
	 				  if (a.score > b.score)
	 					    return -1;
	 					  if (a.score < b.score)
	 					    return 1;
	 					  return 0;
	 					});
		     
	 			   $scope.listeUtilisateur= $scope.listeUtilisateur.sort();
		 }, function() {
		     console.log("erreur lors de la recuperation de la liste des Utilisateurs");
		 });

	}
	
	//l'utilisateur n'est pas authentifi�
	//redirection
	else{		
		$scope.go('#/connexion');
	}	
	
	//Redirection vers l'accueil
	$scope.onAccueil = function () {
		$scope.go('#/home');
	  };

		
	
	
}]);