const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
    Post.findAll({
      attributes: [
        "id",
        "post_url",
        "title",
        "created_at",
       
      ],
      include: [
        {
          model: Comment,
          attributes: ["comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })
      .then((dbPostData) => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render("homepage", {posts, loggedIn:req.session.loggedIn});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
       res.redirect('/');
      
      return;
    }
    res.render('login');
  });

  router.get('/logout', (req, res) => {
    res.render('homepage');
});

router.get('/sign-up', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('sign-up');
});

// get single post
router.get('/posts/:id', (req, res) => {
  Post.findAll({
      where: {
          id: req.params.id
      },
      attributes: [
          'id',
          'post_url',
          'title',
          'created_at'
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
      .then(dbBlogData => {
          if (!dbBlogData) {
              res.status(404).json({ message: 'No postfound' });
              return;
          }
          const posts = dbBlogData.map((post) => post.get({ plain: true }));
          console.log(posts);
          res.render("single-post", {
              posts, loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
          res.status(500).json(err);
      });
});
  module.exports = router;
  