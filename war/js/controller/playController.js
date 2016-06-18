// create the controller and inject Angular's $scope
App.controller('playController', [ '$scope', 'GApi','$rootScope', '$mdDialog',function($scope, GApi,$rootScope, $mdDialog) {

	$scope.go = function ( path ) {
		   window.location.href=path;
		  };
		  
		  $scope.gameLoaded = false;

 //On v�rifie que l'utilisateur est connect�
   if($rootScope.connecte==true){
		  
	 
	var data = [];

	// create a message to display in our view
	$scope.message = '\u00e7a se boit ou \u00e7a se mange ? ';
	$scope.drink = '\u00e7a se boit';
	$scope.eat = '\u00e7a se mange';
	$scope.currentQuestion = '';
	$scope.isCorrecting = false;
	$scope.score = 0;
	$scope.isPlaying = true;
	$scope.isGameFinished = false;
	$scope.isSelectingArea = false;
	$scope.reponses = [];
	$scope.currentReponse = {};
	$scope.resultatFinal;
	$scope.listeDetailReponse = [];
	// la map
	$scope.map;

	// le nom de l'aoc
	$scope.aocLabel = '';
	$scope.currentIndex = 0;

	// l'aoc courant
	$scope.currentAoc;

	// données de progression du jeu
	$scope.nbQuestions = data.length;
	$scope.currentQuestionNumber = 0;
	$scope.avancement = 0;


	$(document).ready(function() {
		$('#aoc-map').vectorMap({
		    map: 'france_fr',
			hoverOpacity: 0.5,
			hoverColor: false,
			backgroundColor: "#ffffff",
			colors: couleurs,
			borderColor: "#000000",
			selectedColor: "#EC0000",
			enableZoom: false,
			showTooltip: true,
		    onRegionClick: function(element, code, region) {
		       mapParams.regionSelected = code;
		       mapParams.libelleSelected = region;
		       console.debug(mapParams);
		    }
		});
	});
	

	// changement d'une question
	$scope.changeQuestion = function(index) {
		if (index < data.length) {
			$scope.currentAoc = data[index];
			$scope.currentIndex = index;
			$scope.currentQuestion = $scope.currentAoc.aoclabel;
			$scope.message = '\u00e7a se boit ou \u00e7a se mange ? ';
			mapParams.libelleSelected = null;
			mapParams.regionSelected = null;
		} else {
			// partie terminée
			for(var i=0; i < $scope.reponses.length; ++i) {
				var userReponse = $scope.reponses[i];
				var realReponse = data[i];
				
				var somme = realReponse.nbBoit + realReponse.nbMange;
				var typeCorrect = false;
				var regionCorrect = (userReponse.codeRegion == realReponse.codeRegion) ;
				if(somme == 0 || realReponse.nbBoit == realReponse.nbMange) {
					typeCorrect = true;
				} else {
					switch(userReponse.type) {
					case 'N':
						typeCorrect = realReponse.nbMange > realReponse.nbBoit;
						break;
					case 'B':
						typeCorrect = realReponse.nbBoit > realReponse.nbMange;
						break;
					}
				}
				if(typeCorrect && regionCorrect) {
					$scope.score = $scope.score+1;
				}
			}
			$scope.question = '';
			$scope.message = "FIN";
			$scope.isCorrecting = true;
			$scope.isPlaying = false;
			$scope.currentQuestion = "Ton score est : " + $scope.score + " / " + data.length;
			$rootScope.resultatFinal = $scope.score + " / " + data.length;
			$scope.isGameFinished = true;
		}
	}

	$scope.onDrink = function() {
		$scope.isSelectingArea = true;
		$scope.message = "\u00e7a se boit o\u00f9 ?";
		$scope.currentReponse.type = 'B';
		$scope.currentReponse.libelleType = "\u00e7a se boit";
		
		var aocToSave = {};
		aocToSave.id = $scope.currentAoc.id;
		aocToSave.aoclabel = $scope.currentAoc.aoclabel;
		aocToSave.codeRegion = $scope.currentAoc.codeRegion;
		aocToSave.nbMange = $scope.currentAoc.nbMange;
		aocToSave.nbBoit = $scope.currentAoc.nbBoit + 1;
		
		$scope.saveAoc(aocToSave);
	}

	$scope.onEat = function() {
		$scope.isSelectingArea = true;
		$scope.message = "\u00e7a se mange o\u00f9 ?";
		$scope.currentReponse.type = 'N';
		$scope.currentReponse.libelleType = "\u00e7a se mange";
		
		var aocToSave = {};
		aocToSave.id = $scope.currentAoc.id;
		aocToSave.aoclabel = $scope.currentAoc.aoclabel;
		aocToSave.codeRegion = $scope.currentAoc.codeRegion;
		aocToSave.nbMange = $scope.currentAoc.nbMange + 1;
		aocToSave.nbBoit = $scope.currentAoc.nbBoit ;
		
		$scope.saveAoc(aocToSave);
	}

	$scope.onContinue = function() {
		if(stringUtils.isEmpty(mapParams.regionSelected)) {
			$scope.showAlertMap();
			return;
		}
		$('#aoc-map').vectorMap('set', 'colors', couleurs);
		var resp = {
				type : $scope.currentReponse.type,
				libelleType : $scope.currentReponse.libelleType,
				codeRegion : mapParams.regionSelected,
				libelleRegion : mapParams.libelleSelected
		};
		$scope.reponses.push(resp);
		
		var type = '';
		var libelleType = '';
		var somme = $scope.currentAoc.nbBoit + $scope.currentAoc.nbMange;
		if(somme = $scope.currentAoc.nbBoit > $scope.currentAoc.nbMange) {
			type = 'B';
			libelleTYpe = "\u00e7a se boit"
		} else if($scope.currentAoc.nbMange > $scope.currentAoc.nbBoit) {
			type = 'N';
			libelleType = "\u00e7a se mange";
		}
		
		if(stringUtils.isEmpty(libelleType)) {
			libelleType = "les deux r\u00e9ponses sont correctes ! 50\u0025 des gens pensent que \u00e7a se boit et 50\u0025 pensent que \u00e7a se mange !";
		}
		
		var libelleCorrectRegion = constantes.TABLEAU_REGIONS[$scope.currentAoc.codeRegion];
		
		var detail = {
				type : $scope.currentReponse.type,
				libelleAoc : $scope.currentAoc.aoclabel,
				libelleType : $scope.currentReponse.libelleType,
				codeRegion : mapParams.regionSelected,
				libelleRegion : mapParams.libelleSelected,
				correctType : type,
				correctLibelleType : libelleType,
				correctRegion : libelleCorrectRegion
		};
		
		$scope.listeDetailReponse.push(detail);
		
		$scope.isCorrecting = false;
		$scope.isSelectingArea = false;
		// nouvelle question
		$scope.changeQuestion($scope.currentIndex + 1);
		// mise à jour de l'avancement
		$scope.currentQuestionNumber = $scope.currentIndex + 1;
		$scope.avancement = Math.floor(($scope.currentQuestionNumber / $scope.nbQuestions) * 100);
	}
	
	// ouvre la popup de détails
	$scope.onDetails = function(ev) {
		console.debug("details");	    
		$rootScope.listeAocQuestions = data;
		$rootScope.listeAocReponses = $scope.reponses;
		$rootScope.listeDetailReponse = $scope.listeDetailReponse;
	    $mdDialog.show({
	        controller: PopupController,
	        templateUrl: '/pages/popupResultats.html',
	        parent: angular.element(document.body),
	        targetEvent: ev,
	        clickOutsideToClose:true,
	        fullscreen: false
	      })
	      .then(function(answer) {
	        $scope.status = 'You said the information was "' + answer + '".';
	      }, function() {
	        $scope.status = 'You cancelled the dialog.';
	      });
	    
	  };
	  
	  $scope.saveAoc = function(aoc) {
		// récupération de la liste d'AOC
			GApi.execute('aocentityendpoint', 'updateAocEntity', aoc).then( function(response) {
					console.debug("Sauvegarde de "+aoc.id+" effectuée !");
			}, function() {
					console.log("erreur lors de la sauvegarde de l'AOC");
			});
	  };
	  
	  $scope.onSave = function() {
		  $scope.gameLoaded = false;
		  var newUtilisateur={};
          newUtilisateur.id=$rootScope.Utilisateur.profilId;
          newUtilisateur.name =$rootScope.Utilisateur.profilName;
          newUtilisateur.image =$rootScope.Utilisateur.profilImage;
          newUtilisateur.score = $scope.score;
          console.debug(newUtilisateur);
          GApi.execute('utilisateurentityendpoint', 'updateUtilisateurEntity', newUtilisateur).then( function(response) {
				console.debug("Sauvegarde de "+newUtilisateur.id+" effectuée !");
				$scope.gameLoaded = true;
		}, function() {
				console.log("erreur lors de la sauvegarde du score");
		});
	  };
	  
	  $scope.showAlertMap = function(ev) {
		    $mdDialog.show(
		      $mdDialog.alert()
		        .parent(angular.element(document.querySelector('#gameArea')))
		        .clickOutsideToClose(true)
		        .title('Oh !')
		        .textContent('Tu n\u0027as pas s\u00e9lectionn\u00e9 de r\u00e9gion !')
		        .ariaLabel('Alert Dialog Demo')
		        .ok('OK !')
		        .targetEvent(ev)
		    );
		  };
		  
		// récupération de la liste d'AOC
		GApi.execute('aocentityendpoint', 'getRandomListAoc').then( function(response) {
				console.debug("Liste chargée!");
				console.debug(response);
				data = response.items;
				$scope.gameLoaded = true;
				$scope.changeQuestion(0);
		}, function() {
				console.log("erreur lors de la recuperation de la liste des AOC");
		});
		  
	
 }
 
 else{		
 	$scope.go('#/connexion');
 }

} ]);

function PopupController($scope, $mdDialog, $rootScope) {
	console.debug($rootScope);
	$scope.listeAocQuestions = $rootScope.listeAocQuestions;
	$scope.listeAocReponses = $rootScope.listeAocReponses;
	$scope.listeDetailReponse = $rootScope.listeDetailReponse;
	
	$scope.resultatFinal = $rootScope.resultatFinal;
	$scope.hide = function() {
	$mdDialog.hide();
	};

	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
}