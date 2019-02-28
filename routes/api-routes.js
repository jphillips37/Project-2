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
  // app.get("/posts", function(req, res) {
  //   db.Post.findAll({})
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // app.get("/posts/:region", function(req, res) {
  //   db.Post.findAll({
  //     where: {
  //       region: req.params.region
  //     }
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // app.get("/posts/:id", function(req, res) {
  //   db.Post.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

    // app.get("/posts/:author", function(req, res) {
    //     db.Users.findOne({
    //       where: {
    //         user_name: req.params.user_name
    //       }
    //     })
    //       .then(function(dbPost) {
    //         res.json(dbPost);
    //       });
    //   });

  // app.post("/posts", function(req, res) {
  //   console.log(req.body);
  //   db.Post.create({
  //     title: req.body.title,
  //     body: req.body.body,
  //     category: req.body.category
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // app.delete("/posts/:id", function(req, res) {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // app.put("/posts", function(req, res) {
  //   db.Post.update(req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });
};
