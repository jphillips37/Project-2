var path = require("path");
var db = require("../models/index.js");
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    var object = {};
    db.Post.findAll({
      order:[
        ["createdAt", "DESC"]
      ],
      limit: 2
    }).then(function(results){
      object.title = results[0].post_title;
      object.body = results[0].post_body;
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
