angular.module('BlaBlaCar.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicModal, $timeout, $ionicHistory, user) {
  $scope.user = user;

  $scope.disconnect = function() {
    user.isLogin = false;
    user.lastName = "";
    user.firstName = "";
    user.email = "";
    user.userName = "";

    $ionicHistory.clearCache().then(function() {
      //now you can clear history or goto another state if you need
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
      $sate.go('app.home', {reload: true});
    })
  }
});
