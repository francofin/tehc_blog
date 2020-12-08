const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);
    res.render('homepage', {
      loggedIn: req.session.loggedIn
    });
  });

  router.get("/about", (req, res) => {
    res.render("about");
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

router.get("/signup", (req, res) => {
  if(req.session.loggedIn) {
    res.redirect("/");
    return;
  }
    res.render("signup");
});

  module.exports = router;