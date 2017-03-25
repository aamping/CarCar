angular.module('BlaBlaCar')

    // Factory pour Firebase
    .factory("Trajets", function($firebaseArray, $firebase) {
        //var itemsRef = new Firebase("https://carcarapp-35ba8.firebaseio.com/trajets");


        var itemsRef = firebase.database();
        return itemsRef;//$firebaseArray(itemsRef);
    })

    .controller('TrajetCtrl', function($scope, $state, ionicDatePicker, ionicTimePicker, Trajets, $cordovaGeolocation, $http, user) {

        $scope.TrajetFactory = Trajets;

        // Object Trajet
        $scope.trajet = {
            pointDepart: '',
            pointDepartVille:'',
            pointDepartPays:'',
            pointArrive: '',
            pointArriveVille:'',
            pointArrivePays:'',
            allerRetour: '',
            fumeur: '',
            dateDepart: '',
            timeDepart : '',
            dateEnd: '',
            timeEnd: '',
            prix: '',
            userMail:'',
            lastName:'',
            firstName:''
        }


        //------------------- DatePicker ------------------//
        var datePickerTrajetStart = {
            callback: function (val) {  //Mandatory
                dateStart = new Date(val);
                $scope.trajet.dateDepart = dateStart.toLocaleDateString();
            },
            from: new Date(2017, 1, 1),
            to: new Date(2018, 1, 1),
            inputDate: new Date(),
            mondayFirst: true,
            //disableWeekdays: [0],
            closeOnSelect: false,
            templateType: 'popup'
        };

        var datePickerTrajetEnd = {
            callback: function(val) {
                dateEnd = new Date(val);
                $scope.trajet.dateEnd = dateEnd.toLocaleDateString();
            },
            from: new Date(2017, 1, 1),
            to: new Date(2018, 1, 1),
            inputDate: new Date(),
            mondayFirst: true,
            closeOnSelect: false,
            templateType: 'popup'
        }

        $scope.openDatePickerStart = function(){
            ionicDatePicker.openDatePicker(datePickerTrajetStart);
        };

        $scope.openDatePickerEnd = function(){
            ionicDatePicker.openDatePicker(datePickerTrajetEnd);
        };

        //--------------------------------------------------------------------//

        //--------------------------TimePicker ------------------------------//
        var timePickerTrajetStart = {
            callback: function (val) {      //Mandatory
                if (typeof (val) === 'undefined') {
                    alert("Veuillez sélectionner l'heure");
                } else {
                    var selectedTime = new Date(val * 1000);
                    $scope.trajet.timeDepart = selectedTime.getUTCHours()+":"+selectedTime.getUTCMinutes();
                }
            },
            inputTime: 50400,
            format: 12,
            step: 15,
            setLabel: 'Set2'
        };

        // TimePicker
        var timePickerTrajetEnd = {
            callback: function (val) {      //Mandatory
                if (typeof (val) === 'undefined') {
                    alert("Veuillez sélectionner l'heure");
                } else {
                    var selectedTime = new Date(val * 1000);
                    $scope.trajet.timeEnd = selectedTime.getUTCHours()+":"+selectedTime.getUTCMinutes();
                }
            },

            inputTime: 50400,
            format: 12,
            step: 15,
            setLabel: 'Set2'
        };

        $scope.openTimePickerStart = function() {
            ionicTimePicker.openTimePicker(timePickerTrajetStart);
        }

        $scope.openTimePickerEnd = function() {
            ionicTimePicker.openTimePicker(timePickerTrajetEnd);
        }
        //--------------------------------------------------------------------//

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
                        $scope.trajet.pointDepart = ville+","+pays;

                    }).
                    error(function(data, status, headers, config) {
                        alert("Une erreur est survenue lors de la tentative de géolocalisation")
                    });

                }, function(err) {
                    alert("Erreur lors de la récupération de votre position actuelle");
                });
        };



        // Method to post a trajet
        $scope.postTrajet = function(isValid) {

            if (!isValid) {
                alert('Vous devez remplir tous les champs');
                return;
            }
            var regex = new RegExp("[ ,]+", "g");
            var depart = $scope.trajet.pointDepart.toString().split(regex);
            var arrive = $scope.trajet.pointArrive.toString().split(regex);

            $scope.trajet.pointDepartVille = depart[0].toString();
            $scope.trajet.pointDepartPays = depart[1].toString();
            $scope.trajet.pointArriveVille = arrive[0].toString();
            $scope.trajet.pointArrivePays = arrive[1].toString();

            if (user.isLogin) {
                $scope.trajet.userMail = user.email;
                $scope.trajet.lastName = user.lastName;
                $scope.trajet.firstName = user.firstName;
            }
            var uid;
            firebase.auth().onAuthStateChanged(function(user) {
                  if (user) {
                    uid = user.uid;
                    alert('user: ' + uid);
                  } else {
                    // No user is signed in.
                  }
            });
            // Persist the object on firebase
            var newKey =  firebase.database().ref().child('trajets').push().key;
            var postData = {
                userId: firebase.auth().currentUser.uid,
                departPays: $scope.trajet.pointDepartPays,
                departVille: $scope.trajet.pointDepartVille,
                arrivePays: $scope.trajet.pointArrivePays,
                arriveVille: $scope.trajet.pointArriveVille,
                dateDepart: $scope.trajet.dateDepart,
                timeDepart: $scope.trajet.timeDepart,
                dateEnd: $scope.trajet.dateEnd,
                timeEnd: $scope.trajet.timeEnd
            };

            var updates = {};
             updates['/trajets/' + newKey] = postData;
           // var updates = {};
            //updates['/trajets/' + newKey] = $scope.trajet;
            //updates['/user-trajets/' + newKey] = $scope.trajet;

            //$scope.TrajetFactory.ref().update(updates);
            //Error: Firebase.update failed: First argument contains a function in property 'trajets.-Kg3XhooG9USL61Eg93C.pointDepart.geometry.location.lat' with contents: function (){return a} 
            if (firebase.database().ref().update(updates)){
                alert('Success');
            }
            
            $state.go('app.home');

        }
    });

