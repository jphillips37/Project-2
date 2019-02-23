var path = require("path");
var db = require("../models/index.js");
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    var postsObject = {};
    var object = {};
    db.Post.findAll({
      order:[
        ["createdAt", "DESC"]
      ],
      limit: 2,
      include: [db.User]
    }).then(function(results){
      var postsArray = [];

      object.title = results[0].post_title;
      object.body = results[0].post_body;
      object.region = results[0].region;
      object.city = results[0].city;
      object.user = results[0].User.user_name;
      object.time = results[0].createdAt;
      
      //console.log(results[0].User.user_name);
      console.log(object);
      res.render("index", object);
    })

  });

  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads blog.html
  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

};
