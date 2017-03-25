angular.module('BlaBlaCar')
// Factory pour Firebase

    .controller('RegisterCtrl', function($scope, $state, $firebase) {


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
            firebase.auth().createUserWithEmailAndPassword(email, password)
            . then(function(user){
              alert("Your account has been created");
              $state.go('app.login');
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
            });
            //$scope.UserFactory.$add($scope.registerInformations);


        };
    });
