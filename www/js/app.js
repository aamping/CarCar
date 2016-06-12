// Ionic BlaBlaCar App

angular.module('BlaBlaCar', ['ionic', 'BlaBlaCar.controllers', 'BlaBlaCar.routes', 'ionicDatePicker', 'ionicTimePicker', 'firebase', 'ngAutocomplete', 'ngCordova'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
