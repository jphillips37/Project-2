var config = {
    apiKey: "AIzaSyCh7cia3s-U2b6gK11yo0U7URcEB0HPYJ0",
    authDomain: "project-2-e5bca.firebaseapp.com",
    databaseURL: "https://project-2-e5bca.firebaseio.com",
    projectId: "project-2-e5bca",
    storageBucket: "",
    messagingSenderId: "564080125605"
  };
  
  firebase.initializeApp(config);

  let database = firebase.database();

// register account function
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

// login function
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

// check to see if any users are logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
      }
      else {
        console.log("No user signed in.");
      }
    });

// turn off post functionality until a user is logged in
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

    function gitHubLogin() {

      var provider = new firebase.auth.GithubAuthProvider();

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
    }

    $("#githubBtn").on("click", gitHubLogin);