const Post = require('../model/post')

module.exports.home = async function (req, res) {

    let posts = await Post.find({})


    return res.render('home', {
        title: "Home",
        posts: posts
    })

    // let posts = await Post.find({});
    // return res.render('home', {
    //     title: "Home",
    //     posts: posts
    // })


}

