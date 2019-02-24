$(document).ready(function(){

  var config = {
    apiKey: "AIzaSyCh7cia3s-U2b6gK11yo0U7URcEB0HPYJ0",
    authDomain: "project-2-e5bca.firebaseapp.com",
    databaseURL: "https://project-2-e5bca.firebaseio.com",
    projectId: "project-2-e5bca",
    storageBucket: "project-2-e5bca.appspot.com",
    messagingSenderId: "564080125605"
  };

  firebase.initializeApp(config);

  var database = firebase.database();


$(".register form").on("submit", function(event){
  event.preventDefault();

  var email = $(".register .email").val();
  var password = $(".register .password").val();

  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user){
          console.log(user);
      })
      .catch(function(error){
          console.log(error);
      });



  });

$(".register form").on("submit", function(event){
  event.preventDefault();

  var email = $(".register .email").val();
  var password = $(".register .password").val();

  firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(user){
          console.log(user);
      })
      .catch(function(error){
          console.log(error);
      });

  });

  firebase.auth().onAuthStateChanged(function(user){

      $(".route form").off();

      if(user){
          console.log("User is signed in.");

          $(".route form").on("submit", function(event){
              event.preventDefault();

              var route = $(".post .text").val();

              firebase.database().ref("/users/" + user.uid).child("/post/").push(post);
          })
      } else {
          console.log("No user logged in..")
      }
  });

});