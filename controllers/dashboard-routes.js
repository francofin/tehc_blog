const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'body',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/', withAuth, (req, res) => {
    User.findOne({
      where: {
        user_id: req.session.user_id
      }, 
      attributes: ['username']
    })
    .then(dbPostData => {
      // serialize data before passing to template
      const name = dbPostData.map(name => name.get({ plain: true }));
      res.render('dashboard', { name, loggedIn: true });
    })
  });

  router.get("/new", withAuth, (req, res) => {
    res.render("new-post");
  });

  router.get("/:id", withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
    })
    .then(dbPostData => {
      if(dbPostData) {
        const post = dbPostData.get({plain: true});
        res.render('edit-post', {
          post,
          loggedIn: req.session.loggedIn,
          
        });
      } else {
        res.status(400).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
  });

module.exports = router;