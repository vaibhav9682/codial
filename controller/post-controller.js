const Post = require('../model/post')
const Comment = require('../model/comment')

module.exports.createPost = function (req, res) {

    if (req.isAuthenticated()) {
        Post.create({
            content: req.body.content,
            user: req.user._id
        })
        return res.redirect('/')
    }

    return res.redirect('/users/sign-in')

}

module.exports.destroy = async function (req, res) {
    let post = await Post.findById(req.params.id);
    //  .id means converting the object id into string

    if (post.user == req.user.id) {
        post.remove();
        await Comment.deleteMany({ post: req.params.id })
        return res.redirect('back');
    }

    return res.redirect('back');

}

