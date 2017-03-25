angular.module('BlaBlaCar')

    .controller('ResultsCtrl', function($scope,$state, $stateParams, $firebaseArray) {

        var searchParams = angular.fromJson($stateParams.searchValue);

<<<<<<< HEAD
        //var itemsRef = new Firebase("https://carcarapp-35ba8.firebaseio.com/trajets");
        var config = {
          apiKey: "AIzaSyC8o0PWnndZ-nX20F_dhsvCVKWwZmyEnnw",
          authDomain: "carcarapp-35ba8.firebaseapp.com",
          databaseURL: "https://carcarapp-35ba8.firebaseio.com/trajets"
        };

        firebase.initializeApp(config);

        var itemsRef = firebase.database().ref();

=======
        var itemsRef = new Firebase("https://carcar-3a341.firebaseio.com/trajets");
        
>>>>>>> 5bf7168491db08ead5d08d186e347eb74a8e7e3f
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
