// mainController
App.controller('mainController',['$scope','GApi','$rootScope', '$location', function($scope,GApi,$rootScope, $location) {
	
	//Redirection
	$scope.go = function ( path ) {
	    	window.location.href=path;
	    };

	//Deconnexion    
	$scope.signOut=function() {
	    	$rootScope.deconnexion=true;
	    	$rootScope.connecte=false;
	        var auth2 = gapi.auth2.getAuthInstance();
	        auth2.signOut().then(function () {
	          console.log('User signed out.');
	        });
	        $scope.go('#/connexion');
	  }
	
   

   //On v�rifie que l'utilisateur est bien connecte 
    if($rootScope.connecte==true){
	
	
	    $scope.subtitle = '\u00e7a se boit ou \u00e7a se mange ? ';
	    $scope.appName = 'AOC Quizz';
	    $scope.profilName=$rootScope.Utilisateur.profilName;
	    $scope.profilId=$rootScope.Utilisateur.profilId;
    
        //Si l'utilisateur n'a pas d'image de profil 
	    //On lui met celui par defaut 
	    if( typeof($rootScope.Utilisateur.profilImage)=='undefined'){	
	    	$scope.profilImage="/img/images/user.jpg";	
	    }
	    else{	
	    	$scope.profilImage=$rootScope.Utilisateur.profilImage;	    	
	    }
    
	    
	    
	    //Inscription de l'utilisateur 
	    //S'il n'est pas inscrit dans le DataStore
	    
	    $scope.inscription();   

   }
   else{

		$scope.go('#/connexion');
	}
    
  
 //Inscription Automatique de l'utilisateur 
 $scope.inscription=function() {
	 
   GApi.execute('utilisateurentityendpoint', 'listUtilisateurEntity').then( function(response) {
       
       	$scope.deja_inscrit=false;
 	 	$scope.indice=0;   	 			
     	
     	//On v�rifie que la liste n'est pas vide
	 		if(typeof response.result.items=="undefined"){
	 	
        	    $scope.deja_inscrit=false;            	  
	 		}
	 		// Si la liste n'est pas vide 
	 		//On v�rifie que le newUtilisaNomteur n'existe pas deja 
	 		else 
	 		{
   		 
	 			while($scope.indice<response.result.items.length && $scope.deja_inscrit != true){
          	   
	 				if($rootScope.Utilisateur.profilId==response.result.items[$scope.indice].id){
   	   
	 					$scope.deja_inscrit=true;  
	 				}
  
	 				$scope.indice++;
	 			}
      	
	 		}
    	

          //Utilisateur non inscrit
          if (!$scope.deja_inscrit){

              var newUtilisateur={};
              newUtilisateur["id"] =$rootScope.Utilisateur.profilId;
              newUtilisateur["name"] =$rootScope.Utilisateur.profilName;
              newUtilisateur["image"] =$rootScope.Utilisateur.profilImage;
              newUtilisateur["score"] =0;
              
              		GApi.execute('utilisateurentityendpoint', 'insertUtilisateurEntity',newUtilisateur).then( function(response) {
                                   
              			 console.log("Enregistrement effectue");
              		 }, function() {
              		     console.log("erreur lors de l'inscription");
              		 });
             
      
          }else{
         	 console.log("Deja inscrit");
         	 							            	 
          }
       
     
 }, function() {
     console.log("erreur lors de la recuperation de la liste des Utilisateurs");
 });


 };
   
   
   
}]);