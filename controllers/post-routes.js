const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all blogs
router.get("/", withAuth, (req, res) => {
    // expects {title: 'Coding', blog_post: 'Lorem Ipsum', user_id: 1}
    Post.findAll({
        where :{
        user_id: req.session.user_id},
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
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
        .then((dbBlogData) => {
            const posts = dbBlogData.map((blog) => blog.get({ plain: true }));
            res.render("create-blog", { posts, loggedIn: true })

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get one blog by id
router.get('/:id', withAuth,(req, res) => {
    Post.findAll({
        where: { id: req.params.id },
        attributes: [
            'id',
            'title',
            'post_url',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['comment_text'],
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
            if (dbBlogData) {
                const posts = dbBlogData.map((blog) => blog.get({ plain: true }));
                console.log("check this", blogs)
                res.render('create-blog', {
                    posts, loggedIn:true
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;