const Post = require("../models/postModels");

module.exports.createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.send(post);
    } catch (err) {

    }
}

module.exports.showPost = async(req, res) => {
    try {
        const posts = await Post.find({});
        res.send(posts);
    } catch (err) {

    }
}