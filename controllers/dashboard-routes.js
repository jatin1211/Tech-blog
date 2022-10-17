const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
        attributes: ["id", "title", "post_url", "created_at"],
        include: [
          {
            model: Comment,
            attributes: [
              "id",
              "comment_text",
              "user_id",
              "created_at",
            ],
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
          const posts = dbPostData.map((blog) => blog.get({ plain: true }));
          // console.log(posts);
          res.render("dashboard", { posts, loggedIn: true });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });

    module.exports = router;