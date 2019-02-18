var config = {
    apiKey: "AIzaSyCh7cia3s-U2b6gK11yo0U7URcEB0HPYJ0",
    authDomain: "project-2-e5bca.firebaseapp.com",
    databaseURL: "https://project-2-e5bca.firebaseio.com",
    projectId: "project-2-e5bca",
    storageBucket: "",
    messagingSenderId: "564080125605"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  $(".register form").on("submit", function(event){
    event.preventDefault();

    var email = $(".register .email").val();
    var password = $(".register .password").val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user) {
      console.log(user);
    })
    .catch(function(err) {
      console.log(err);

      });
    });
    
    $(".login form").on("submit", function(event){
      event.preventDefault();

    var email = $(".login .email").val();
    var password = $(".login .password").val();

    firebase.auth().signInUserWithEmailAndPassword(email, password)
    .then(function(user) {
      console.log(user);
    })
    .catch(function(err) {
      console.log(err);

      });
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
      }
      else {
        console.log("No user signed in.");
      }
    });

    firebase.auth().onAuthStateChanged(function(user) {
      $(".post form").off();

      if (user) {
        $(".post form").on("submit", function(event){
          event.preventDefault();

          var post = $(".post .text").val();

          firebase.database().ref("/users/" + user.uid).child("/post").push(post);
        })
      } else {
        $(".post form").on("submit", function(event) {
          alert("please log in!");
        })
      }
      
    });

  

  