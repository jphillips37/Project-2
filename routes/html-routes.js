var path = require("path");
var db = require("../models/index.js");
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    var postsObject = {};
    
    db.Post.findAll({
      order:[
        ["createdAt", "DESC"]
      ],
      limit: 2,
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
    db.sequelize.query('select distinct region from posts', { raw: true }).then(function(results){
      var regions = [];
      //res.json(results[0][0]);

      for(i=0; i < results[0].length; i++){
        regions.push(results[0][i]);
      }

      var regionsList = {
        regions: regions
      };

      res.render("forum", regionsList)
    });
  });

  app.get("/:region/cities", function(req, res) {
    var region = req.params.region;  
    region.replace(/%20/g, " ");
    console.log(region);  
    var queryString = "select distinct city from posts";
    var cities = [];

    db.sequelize.query(queryString, { raw: true }).then(function(results){
      for(i=0; i < results[0].length; i++){
        console.log(results[0][0]);
        cities.push(results[0].city);
      };
      //res.json(results);
    });
    res.json(cities);
    console.log(cities);
    //res.render("forum", cities);
  });

  app.get("/:region/:city", function(req, res) {
    
  });

};
