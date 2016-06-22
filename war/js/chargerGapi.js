
//Chargement de Gapi
   App.run(['GApi', 'GAuth',
             function(GApi, GAuth) {
                 var BASE = 'https://1-dot-projetaoc-1315.appspot.com/_ah/api';
                 GApi.load('utilisateurentityendpoint','v1',BASE).then(function(resp) {
                     console.log('api: ' + resp.api + ', version: ' + resp.version + ' loaded');
                     
                 } , function(resp) {
                     console.log('an error occured during loading api: ' + resp.api + ', resp.version: ' + version);
                 });
                 
                 GApi.load('historiqueentityendpoint','v1',BASE).then(function(resp) {
                     console.log('api: ' + resp.api + ', version: ' + resp.version + ' loaded');
                     
                 } , function(resp) {
                     console.log('an error occured during loading api: ' + resp.api + ', resp.version: ' + version);
                 });
                
                 GApi.load('aocentityendpoint','v1',BASE).then(function(resp) {
                     console.log('api: ' + resp.api + ', version: ' + resp.version + ' loaded');
                     
                 } , function(resp) {
                     console.log('an error occured during loading api: ' + resp.api + ', resp.version: ' + version);
                 });
                
             }
             
         ]);