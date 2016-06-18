//Directive pour la comparaison des mots de passe 
App.directive('equalsTo', [function () {
    return {
        restrict: 'A', 
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, control) {
            var check = function () {
                //Valeur du champs courant 
                var v1 = scope.$eval(attrs.ngModel);
                //valeur du champ à comparer
                var v2 = scope.$eval(attrs.equalsTo).$viewValue;

                return v1 == v2;
            };

            scope.$watch(check, function (isValid) {
                // Défini si le champ est valide
                control.$setValidity("equalsTo", isValid);
            });
        }
    };
}]);