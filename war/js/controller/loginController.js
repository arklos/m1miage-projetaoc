//loginController
App.controller('loginController',['$scope','GApi','$rootScope', function($scope,GApi,$rootScope) {
	
	
	//Donnees Utilisateur 
	$rootScope.Utilisateur ={};
	$rootScope.Utilisateur.profilId="";
    $rootScope.Utilisateur.profilName="";
    $rootScope.Utilisateur.profilImage="";
	
	//Utilisateur connecte 
	$rootScope.connecte=false;
		
	// redirection
    $scope.go = function ( path ) {
    	window.location.href=path;
    };
	
    
    //Succ�s --> Connexion || Deconnexion 
    $rootScope.onSuccess=function(googleUser) {
		      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
		      var profile = googleUser.getBasicProfile();
		      
		      //Initialisation des donnees utilisateur 
		      $rootScope.Utilisateur.profilId=profile.getId();
		      $rootScope.Utilisateur.profilName=profile.getName();
		      $rootScope.Utilisateur.profilImage=profile.getImageUrl();
		      
		      //Deconnexion 
		      if($rootScope.deconnexion==true){
		    	  $rootScope.deconnexion=false;
		    	  $rootScope.connecte=false;
		    	 
		      //Connexion
		      }else{
		    	  $rootScope.connecte=true;
		    	  $rootScope.deconnexion=false;
		    	  $scope.go('#/home');
		    	  
		      }    
	    }
	 	    
    //Echec --> Connexion || Deconnexion 
    $rootScope.onFailure=function(error) {
	      console.log(error);
  	    }
	    
    //Mise en forme du bouton de connexion
    $scope.renderButton=function(){
	      gapi.signin2.render('my-signin2', {
	        'scope': 'profile email',
	        'width': 220,
	        'height': 40,
	        'longtitle': true,
	        'theme': 'dark',
	        'onsuccess': $rootScope.onSuccess,
	        'onfailure': $rootScope.onFailure
	      });
	    }
	    	
	 $scope.renderButton();
	    
}]);