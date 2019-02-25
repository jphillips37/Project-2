const db = require("../models");
let userController = module.exports;

// retrieve all users from db
userController.getUsers = (req, res) => {
    db.User.findAll({
      attributes: ["username", "id", "status"]
    }).then(dbUser => {
      res.json(dbUser);
    });
  };

  // retrieve user by id
  userController.getUserById = (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["username", "id", "status"]
    }).then(dbUser => {
      res.json(dbUser);
    });
  };

  // delete user
  userController.deleteUser = (req, res) => {
    if (req.user) {
      db.User.destroy({
        where: {
          id: req.params.id
        }
      }).then(dbUser => {
        res.json(dbUser);
      });
    } else {
      res.redirect("/signin");
    }
  };