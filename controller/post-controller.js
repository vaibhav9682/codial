const Post = require('../model/post')
const Comment = require('../model/comment')

module.exports.createPost = async function (req, res) {

    if (req.isAuthenticated()) {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        await post.populate('user', 'name');
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "post created!"
            })
        }

        req.flash('success', 'Post Is created')
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
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post Deleted Successfully"
            })

        }
        req.flash('success', 'Post is deleted')
        return res.redirect('back');
    }

    return res.redirect('back');

}

