const Comment = require('../model/comment');
const Post = require('../model/post');

module.exports.create = async function (req, res) {

    let post = await Post.findById(req.body.post);

    if (post) {
        Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        }, function (err, comment) {
            if (err) {
                console.log('error in creating post in db');
                return;
            }
            post.comments.push(comment);
            post.save();    

            res.redirect('/')
        }
        )
    }
}