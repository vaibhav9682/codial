const Post = require('../model/post')





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

