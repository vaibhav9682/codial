const Post = require('../model/post')

module.exports.home = async function (req, res) {

    let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
    console.log(posts);

    return res.render('home', {
        title: "Home",
        posts: posts
    })




}

