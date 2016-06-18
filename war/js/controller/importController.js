String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

App.controller('importController', [ '$scope', 'GApi','$rootScope',function($scope, GApi,$rootScope) {
	
	$scope.import = function(){
		  var f = document.getElementById('file').files[0],
		      r = new FileReader();
		  console.debug(f);
		  r.onloadend = function(e){
			  console.debug("loaded!");
		    var data = e.target.result;
		    
		    var lines = data.split(/[\r\n]+/g);
		    if(lines.length === 0) {
		    	alert("Le fichier ne contient aucune donnée à importer !");
		    	return;
		    }
		    if(window.confirm("Le fichier contient "+lines.length+" ligne(s) a importer. Voulez-vous continuer ?")) {
		    	var listAoc = [];
		    	for(var i=1; i<lines.length; ++i) {
		    		var currentLine = lines[i].split(";");
		    		if(currentLine.length >= 6) {
		    		var aire = parseInt(currentLine[0].replaceAll("\"",""));
		    		var libelle = currentLine[1].replaceAll("\"","");
		    		var produit = currentLine[4].replaceAll("\"","")
		    		
		    		var aocEntity = {
		    				idAire : aire,
		    				libelleAire : libelle,
		    				libelleProduit : produit
		    		};
		    		if(!existsAoc(listAoc, aocEntity)) {
		    			listAoc.push(aocEntity);
		    		}
		    		
		    			GApi.execute('aocentityendpoint', 'insertListAocEntity',listAoc).then( function(response) {
	              			 console.log("Enregistrement effectue");
	              		 }, function() {
	              		     console.log("erreur lors de l'inscription");
	              		 });	    	
		    		}
		    	}
		    }
		    //send you binary data via $http or $resource or do anything else with it
		  }
		  r.readAsBinaryString(f);
		}
}]);
 
function existsAoc(listAoc, aoc) {
	for(var i=0; i<listAoc.length; ++i) {
		if(listAoc[i].libelleProduit === aoc.libelleProduit) {
			return true;
		}
	}
	return false;
}