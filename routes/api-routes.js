var db = require("../models");

module.exports = function(app) {

  app.post("/posts", function(req, res) {
    console.log(req.body);
    db.Post.create({
      post_title: req.body.title,
      post_body: req.body.body,
      region: req.body.region,
      city: req.body.city,
      UserId: req.body.UserId
    },{
      include: db.User
    }).then(function(results) {
        res.json(results);
      });
  });

  app.get("/api/users", function(req, res){
    db.User.findAll({
      order:[
        ["createdAt", "DESC"]
      ]
    }).then(function(results){
      res.json(results);
    })
  });

  app.get("/api/posts", function(req, res){
    db.Post.findAll({
      order:[
        ["createdAt", "DESC"]
      ]
    }).then(function(results){
      res.json(results);
    });
  });
};
