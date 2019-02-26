var path = require("path");
var db = require("../models/index.js");

module.exports = function(app) {
  app.get("/", function(req, res) {
    var postsObject = {};
    
    db.Post.findAll({
      order:[
        ["createdAt", "DESC"]
      ],
      limit: 5,
      include: [db.User]
    }).then(function(results){
      var postsArray = [];

      for (i=0; i < results.length; i++){
        var object = {};

        object.title = results[i].post_title;
        object.body = results[i].post_body;
        object.region = results[i].region;
        object.city = results[i].city;
        object.user = results[i].User.user_name;
        object.time = results[i].createdAt;

        postsArray.push(object);
      }
      
      postsObject.objectArray = postsArray;
      console.log(postsObject);
      res.render("index", postsObject);
    })

  });

  app.get("/region", function(req, res) {
    db.sequelize.query('select distinct region from Posts', { raw: true }).then(function(results){
      var locationObject = {};
      var location = [];

      for(i=0; i < results[0].length; i++){
        var object = {};
        console.log(results[0][i])
        object.region = results[0][i].region;
        object.location = results[0][i].region;
        object.next = "cities";
        location.push(object);
      }

      locationObject.locations = location
      console.log(locationObject);
      res.render("forum", locationObject);
    });
  });

  app.get("/:region/cities", function(req, res) {
    var region = req.params.region;  
    region.replace(/%20/g, " ");
    console.log(region);  
    var queryString = "select distinct city from Posts where region like '"+region+"'";

    db.sequelize.query(queryString, { raw: true }).then(function(results){
      var locationObject = {};
      var location = [];
      //res.json(results[0][0]);

      for(i=0; i < results[0].length; i++){
        var object = {};
        console.log(results[0][i])
        object.city = results[0][i].city;
        object.location = results[0][i].city;
        object.region = region;
        object.next = "posts";
        location.push(object);
      }

      locationObject.locations = location
      console.log(locationObject);
      res.render("forum", locationObject);
    });
    
  });

  app.get("/:region/:city/posts", function(req, res) {
    var city = req.params.city;

    db.Post.findAll({
      where: {
        city: city
      },
      order:[
        ["createdAt", "DESC"]
      ],
      include: [db.User]
    }).then(function(results){
      var postsArray = [];
      var postArrayObject = {};

      for (i=0; i < results.length; i++){
        var object = {};
        object.id = results[i].id;
        object.title = results[i].post_title;

        postsArray.push(object);
      }
      postArrayObject.postArray = postsArray;
      res.render("posts", postArrayObject);
    });
  });

  app.get("/:region/:city/posts/:id", function(req, res) {
    var postId = req.params.id;

    db.Post.findAll({
      where: {
        id: postId
      },
      include: [db.User]
    }).then(function(results){
      var object = {};
      object.id = results[0].id;
      object.title = results[0].post_title;
      object.body = results[0].post_body;
      object.region = results[0].region;
      object.city = results[0].city;
      object.points = results[0].post_points;
      object.user = results[0].User.user_name;
      object.user_status = results[0].User.status;

      res.render("post", object);
    });
  });
};