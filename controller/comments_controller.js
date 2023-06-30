const Comment = require('../model/comment');
const Post = require('../model/post');
const User = require('../model/user')
const commentsMailer = require('../mailers/comments_mailer')

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        // console.log(req.body)

        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        }
        )


        post.comments.push(comment);
        post.save();

        let userName = await User.findById(req.user._id)

        comment = await comment.populate('user', 'name email')
        commentsMailer.newComment(comment);

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    comment: comment,
                    userName: userName
                },
                message: "comment created!"
            })
        }
        req.flash('success', 'comment is added')

        res.redirect('/')



    } catch (error) {
        console.log(error)
    }




}


module.exports.delComment = async function (req, res) {
    let post = await Post.find({ comments: req.params.id });
    // console.log("****", post.user)

    let comment = await Comment.findById(req.params.id);
    //    console.log(comment)

    if (comment.user == req.user.id || post[0].user == req.user.id) {
        let postId = comment.post;
        comment.remove();

        if (req.xhr) {

            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "comment Deleted Successfully"
            })

        }


        req.flash('success', 'comment has been deleted')

        let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })

        return res.redirect('back');
    }


    return res.redirect('back');

}
