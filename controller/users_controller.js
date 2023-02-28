module.exports.profile = function(req , res){
    return res.render('user_profile')
}
module.exports.post = function(req,res){
    return res.end("<h1>user post is showing</h1>");
}