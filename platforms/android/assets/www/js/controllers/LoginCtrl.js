angular.module('BlaBlaCar')
    .controller('LoginCtrl', function($scope, $state, $ionicHistory, $firebase) {
        var userLog;
        $scope.loginData = {
            email: '',
            password:''
        };


        //var usersRef = new Firebase("https://carcarapp-35ba8.firebaseio.com/users");
        var usersRef = firebase.database().ref();

        // Normal Authentification
        $scope.connectionAction = function() {
            var isLogin = false;
            var email = $scope.loginData.email;
            var password = $scope.loginData.password;

            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(user){
                  $ionicHistory.clearCache().then(function() {
                  //now you can clear history or goto another state if you need
                  $ionicHistory.clearHistory();
                  $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
                  $state.go('app.home', {reload: true});
                  userLog=user;
                  alert('Name' + userLog.displayName);
                   $scope.userLog=userLog;
              });
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
            });
/*
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
*/
        };


        // OAuth Authentification with Facebook
        $scope.connexionFacebook = function() {
            var user = {
              userName: '',
              lastName:'',
              firstName:'',
              email: '',
              isLogin: false
             };

            //var ref = new Firebase("https://carcarapp-35ba8.firebaseio.com/users");
            var ref = firebase.database().ref();
            var auth = firebase.auth();

            var provider = new firebase.auth.FacebookAuthProvider();
            auth.signInWithPopup(provider)
            .then(function(result) {
              // User signed in!
              var uid = result.user.uid;

              user.userName = result.user.name;
              user.lastName = result.user.last_name;
              user.displayName = result.user.first_name;
              user.email = result.user.email;
              user.isLogin = true;
              userLog =user;

              alert('Name' + userLog.displayName);
              $scope.userLog=userLog;
              $ionicHistory.clearCache().then(function() {
                  //now you can clear history or goto another state if you need
                  $ionicHistory.clearHistory();
                  $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
                  $state.go('app.home', {reload: true});
              });
            })
            .catch(function(error) {
              // An error occurred
              console.log("Login Failed!", error);
              alert("Login Failed!");
            });
        };

        
        
});
