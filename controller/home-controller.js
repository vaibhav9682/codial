const Post = require('../model/post')
const User = require('../model/user')


module.exports.home = async function (req, res) {

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'    
            },
            populate: {
                path: 'likes'
            }
        })
        .populate('likes');


    let users = await User.find({});

    return res.render('home', {
        title: "Home",
        posts: posts,
        all_users: users
    })

}
