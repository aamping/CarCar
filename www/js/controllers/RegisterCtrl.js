angular.module('BlaBlaCar')
// Factory pour Firebase
<<<<<<< HEAD
    .factory("Users", function($firebaseArray, $firebase) {
      //  var itemsRef = new Firebase("https://carcarapp-35ba8.firebaseio.com/users");
      // See https://firebase.google.com/docs/web/setup#project_setup for how to
      // auto-generate this config


      var itemsRef = firebase.database().ref();
=======
    .factory("Users", function($firebaseArray) {
        var itemsRef = new Firebase("https://carcar-3a341.firebaseio.com/users");
>>>>>>> 5bf7168491db08ead5d08d186e347eb74a8e7e3f
        return $firebaseArray(itemsRef);
    })
    .controller('RegisterCtrl', function($scope, $state, Users) {

        $scope.UserFactory = Users;

        $scope.registerInformations = {
            userName: '',
            lastName:'',
            firstName:'',
            email: '',
            password: '',
            password2: ''
        };

        $scope.registerAction = function() {
            var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
            if(!reg.test($scope.registerInformations.email)) {
                alert("Votre adresse mail n'est pas valide");
                return;
            }

            if($scope.registerInformations.password != $scope.registerInformations.password2) {
                alert("Les deux mots de passes doivent être similaire");
                return;
            }

            delete $scope.registerInformations.password2;

            $scope.UserFactory.$add($scope.registerInformations);
/*
            // Envoie d'un email
            $cordovaEmailComposer.isAvailable().then(function() {
                var email = {
                    to: $scope.registerInformations.email,
                    cc: '',
                    bcc: '',
                    attachments: [],
                    subject: 'BlaBlaCar new account for '+$scope.registerInformations.lastName+' '+$scope.registerInformations.firstName,
                    body: 'Thank\'s to register to BlaBlaCar Application, <br><br><br>' +
                    'Your account informations is : <br><br>' +
                    'Username : '+$scope.registerInformations.userName+'<br>' +
                    'Password :'+$scope.registerInformations.password+'<br><br><br>' +
                    'Best Regards<br>' +
                    'BlaBlaCar community',
                    isHtml: true
                };

                $cordovaEmailComposer.open(email).then(null, function () {
                    alert("l'envoie de l'email a échoué");
                });
            });

*/
            alert("Votre compte a bien été créé");

            $state.go('app.login');
        };
    });
