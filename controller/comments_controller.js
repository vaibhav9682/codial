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


module.exports.delComment = async function (req, res) {
    let post = await Post.find({ comments: req.params.id });
    // console.log("****", post.user)

    let comment = await Comment.findById(req.params.id);
    

    if (comment.user == req.user.id || post[0].user == req.user.id) {
        let postId = comment.post;
        comment.remove();
        let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })

        return res.redirect('back');
    }

    return res.redirect('back');

}
