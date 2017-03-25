angular.module('BlaBlaCar')
// Factory pour Firebase
    .factory("Users", function($firebaseArray, $firebase) {
      //  var itemsRef = new Firebase("https://carcarapp-35ba8.firebaseio.com/users");
      // See https://firebase.google.com/docs/web/setup#project_setup for how to
      // auto-generate this config


      var itemsRef = firebase.database().ref();
        return $firebaseArray(itemsRef);
    })
    .controller('RegisterCtrl', function($scope, $state, Users, $firebase) {

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
            var email;
            var password;
            if(!reg.test($scope.registerInformations.email)) {

                alert("Your email isn´t valid");

                return;
            }
              email=$scope.registerInformations.email;
            if($scope.registerInformations.password != $scope.registerInformations.password2) {

                alert("Your two passwords are not the same");
                return;
            }
            password = $scope.registerInformations.password;

            delete $scope.registerInformations.password2;
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
            });

            firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            });

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
            alert("Your account has been created");

            $state.go('app.login');
        };
    });
