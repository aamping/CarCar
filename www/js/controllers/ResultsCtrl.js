angular.module('BlaBlaCar')

    .controller('ResultsCtrl', function($scope,$state, $stateParams, $firebaseArray, $firebase) {

        var searchParams = angular.fromJson($stateParams.searchValue);


        var itemsRef = firebase.database().ref();

        if(!searchParams || searchParams === undefined) {
            $scope.results = $firebaseArray(itemsRef);
        } else {
            var results = [];
            var query = itemsRef.on('value', function (snapshot) {
                var listTrajets = snapshot.val;

                angular.forEach(listTrajets, function (trajet){

                    if (trajet.pointArrivePays == searchParams.arrivePays
                        &&trajet.pointArriveVille == searchParams.arriveVille
                        && trajet.pointDepartPays == searchParams.departPays
                        && trajet.pointDepartVille == searchParams.departVille
                        && trajet.dateDepart == searchParams.date) {
                        results.push(trajet);
                    }
                })
            });

            $scope.results = results;
        }
    });
