import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyC8o0PWnndZ-nX20F_dhsvCVKWwZmyEnnw",
  authDomain: "carcarapp-35ba8.firebaseapp.com",
  databaseURL: "https://carcarapp-35ba8.firebaseio.com/"
};

firebase.initializeApp(config);
var usersRef = firebase.database().ref();
module.exports.usersRef = usersRef; //this doesnt have to be database only
