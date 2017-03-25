angular.module('BlaBlaCar')
    .controller('LoginCtrl', function($scope, $state, $ionicHistory, user, $firebase) {

        $scope.loginData = {
            email: '',
            password:''
        };

        //var usersRef = new Firebase("https://carcarapp-35ba8.firebaseio.com/users");
        var usersRef = firebase.database().ref();

        // Normal Authentification
        $scope.connectionAction = function() {
            var isLogin = false;

            var query = usersRef.on('value', function (snapshot) {
                var listUsers = snapshot.val;

                angular.forEach(listUsers, function (userFireBase) {
                    if (userFireBase.email == $scope.loginData.email && userFireBase.password == $scope.loginData.password) {
                        user.userName = userFireBase.userName;
                        user.lastName = userFireBase.lastName;
                        user.firstName = userFireBase.firstName;
                        user.email = userFireBase.email;
                        user.isLogin = true;
                        isLogin = true;
                    }
                });

                if(isLogin) {
                    $ionicHistory.clearCache().then(function() {
                        //now you can clear history or goto another state if you need
                        $ionicHistory.clearHistory();
                        $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
                        $state.go('app.home', {reload: true});
                    });
                } else {
                    alert("Votre email ou votre mot de passe n'est pas bon");
                }
            });
        };

        // OAuth Authentification with Facebook
        $scope.connexionFacebook = function() {


            //var ref = new Firebase("https://carcarapp-35ba8.firebaseio.com/users");
            var ref = firebase.database().ref();
            var auth = firebase.auth();

            var provider = new firebase.auth.FacebookAuthProvider();
            auth.signInWithPopup(provider).then(function(result) {
              // User signed in!
              var uid = result.user.uid;

              user.userName = result.user.name;
              user.lastName = result.user.last_name;
              user.firstName = result.user.first_name;
              user.email = result.user.email;
              user.lisLogin = true;

              $ionicHistory.clearCache().then(function() {
                  //now you can clear history or goto another state if you need
                  $ionicHistory.clearHistory();
                  $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
                  $state.go('app.home', {reload: true});
              })
            }).catch(function(error) {
              // An error occurred
              console.log("Login Failed!", error);
              alert("La connnexion avec Facebook a échoué");
            });
        /*  ref.authWithOAuthPopup("facebook", function(error, authData) {
=======
            var ref = new Firebase("https://carcar-3a341.firebaseio.com/");
            ref.authWithOAuthPopup("facebook", function(error, authData) {
>>>>>>> 5bf7168491db08ead5d08d186e347eb74a8e7e3f
                if (error) {
                    console.log("Login Failed!", error);
                    alert("La connnexion avec Facebook a échoué");
                } else {
                    user.userName = authData.facebook.name;
                    user.lastName = authData.facebook.last_name;
                    user.firstName = authData.facebook.first_name;
                    user.email = authData.facebook.email;
                    user.lisLogin = true;

                    $ionicHistory.clearCache().then(function() {
                        //now you can clear history or goto another state if you need
                        $ionicHistory.clearHistory();
                        $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
                        $state.go('app.home', {reload: true});
                    })

                }
            }, {
                remember: "sessionOnly",
                scope: "public_profil,email,user_likes"
            });*/
        };

    });
