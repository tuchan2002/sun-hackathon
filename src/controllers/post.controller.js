const Post = require("../models/postModel");
const postController = {
    getAllPost: async (req, res, next) => {
        try {
            const allPost = await Post.find().populate({
                path: "User",
                select: "displayName avatar createdAt",
            });
            if (!allPost) {
                const err = new Error("Can not find any post");
                err.statusCode = 404;
                throw err;
            }
            return res.status(201).json({
                message: "Find all post success.",
                success: true,
                data: {
                    allPost,
                },
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    getPost: async (req, res, next) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                const err = new Error("Can not find post");
                err.statusCode = 404;
                throw err;
            }
            return res.status(201).json({
                message: "Find flashcard success.",
                success: true,
                data: {
                    post,
                    liked: post.usersLiked.includes(req.userId),
                },
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    createPost: async (req, res, next) => {
        try {
            const post = new Post();
            post.User = req.userId;
            post.title = req.body.title;
            post.content = req.body.content;
            post.usersLiked = [];
            post.comments = [];
            await post.save();
            return res.status(201).json({
                message: "Create post success",
                success: true,
                data: {
                    post,
                },
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    deletePost: async (req, res, next) => {
        try {
            await Post.findByIdAndDelete(req.params.id);
            return res.status(201).json({
                message: "Delete flashcard success.",
                success: true,
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    updatePost: async (req, res, next) => {
        try {
            await Post.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                content: req.body.content,
            });
            const newPost = await Post.findById(req.params.id);
            return res.status(201).json({
                message: "Update post success",
                success: true,
                data: {
                    newPost,
                },
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    likePost: async (req, res, next) => {
        const post = await Post.findById(req.params.id);
        if (req.query.liked == "false") {
            post.usersLiked.push(req.query.userId);
            await post.save();
        } else {
            const newUsersLiked = post.usersLiked.filter(
                (id) => id != req.query.userId
            );
            post.usersLiked = newUsersLiked;
            await post.save();
        }
        return res.status(201).json({
            message: "Like success",
            success: true,
            data: {
                post,
                liked: post.usersLiked.includes(req.userId),
            },
        });
    },
    totalLike: async (req, res, next) => {
        let totalLike = 0;
        const posts = await Post.find({ User: req.params.id });
        console.log(posts);
        if (Array.isArray(posts)) {
            for (let post of posts) {
                totalLike += post.usersLiked.length;
            }
        } else {
            if (posts.usersLiked === undefined) totalLike = 0;
            else totalLike = posts.usersLiked.length;
        }
        return res.status(201).json({
            message: "Calculate total like success",
            success: true,
            data: {
                totalLike,
            },
        });
    },
};

module.exports = postController;
