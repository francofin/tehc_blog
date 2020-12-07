const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage');
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
    res.render("signup");
});

  module.exports = router;