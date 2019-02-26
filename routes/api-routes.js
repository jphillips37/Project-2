var db = require("../models");

module.exports = function(app) {

  app.post("/posts", function(req, res) {
    console.log(req.body);
      
      db.User.findAll({
        where:{
          user_name: req.body.user_name
        }
      }).then(function(results){
        db.Post.create({
          post_title: req.body.title,
          post_body: req.body.body,
          region: req.body.region,
          city: req.body.city,
          UserId: results[0].id
        },{
          // include: db.User
        }).then(function(results) {
            res.json(results);
        });
      });
  });
  
};


