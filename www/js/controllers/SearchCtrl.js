angular.module('BlaBlaCar')

    .controller('SearchCtrl', function($scope, $state, ionicDatePicker, $cordovaGeolocation, $http) {

        $scope.search = {
            depart:'',
            departVille:'',
            departPays:'',
            arrive:'',
            arriveVille:'',
            arrivePays:'',
            date:''
        };
        
        $scope.geolocCity = function() {
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    console.log(position);
                    var lat  = position.coords.latitude;
                    var long = position.coords.longitude;

                    $http({method: 'GET', url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true'}).
                    success(function(data, status, headers, config) {
                        var ville = '';
                        var pays = '';
                        var compteur = 0;

                        console.log(data);
                        angular.forEach(data.results[0].address_components, function(object) {
                            if(compteur==2){
                                ville = object.long_name;
                            }
                            if(compteur==5){
                                pays = object.long_name;
                            }
                            compteur = compteur + 1;
                        });
                        $scope.search.depart = ville+","+pays;

                    }).
                    error(function(data, status, headers, config) {
                        alert("Une erreur est survenue lors de la tentative de géolocalisation")
                    });

                }, function(err) {
                    alert("Erreur lors de la récupération de votre position actuelle");
                });

        };


        //------------------- DatePicker ------------------//
        var datePickerVoyage = {
            callback: function (val) {  //Mandatory
                dateVoyage = new Date(val);
                $scope.search.date = dateVoyage.toLocaleDateString();

            },
            from: new Date(2017, 1, 1),
            to: new Date(2018, 1, 1),
            inputDate: new Date(),
            mondayFirst: true,
            //disableWeekdays: [0],
            closeOnSelect: false,
            templateType: 'popup'
        };

        $scope.openDatePicker = function(){
            ionicDatePicker.openDatePicker(datePickerVoyage);
        };

        //--------------- Geolocalisation City start -------------------------//
        $scope.geolocCity = function() {
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    var lat  = position.coords.latitude;
                    var long = position.coords.longitude;

                    $http({method: 'GET', url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true'}).
                    success(function(data, status, headers, config) {
                        var ville = '';
                        var pays = '';
                        var compteur = 0;

                        console.log(data);
                        angular.forEach(data.results[0].address_components, function(object) {
                            if(compteur==2){
                                ville = object.long_name;
                            }
                            if(compteur==5){
                                pays = object.long_name;
                            }
                            compteur = compteur + 1;
                        });
                        $scope.search.depart = ville+","+pays;

                    }).
                    error(function(data, status, headers, config) {
                        alert("Une erreur est survenue lors de la tentative de géolocalisation")
                    });

                }, function(err) {
                    alert("Erreur lors de la récupération de votre position actuelle");
                });
        };

        //------------------ Search Form Send --------------//
        $scope.searchAction = function(isValid) {
            if(!isValid) {
                alert("Vous devez remplir tous les champs de recherche");
                return;
            }

            var regex = new RegExp("[ ,]+", "g");
            var depart = $scope.search.depart.split(regex);
            var arrive = $scope.search.arrive.split(regex);

            $scope.search.departVille = depart[0];
            $scope.search.departPays = depart[1];
            $scope.search.arriveVille = arrive[0];
            $scope.search.arrivePays = arrive[1];

            $state.go('app.results', {searchValue: angular.toJson($scope.search)});
        }
    });
