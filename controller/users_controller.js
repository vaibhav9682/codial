const User = require('../model/user')
module.exports.profile = function (req, res) {
    return res.render('user_profile')
}

// render sign page
module.exports.signIn = function (req, res) {
    return res.render('signIn', {
        title: "Codial | Sign In"
    })
}

// render sign up page
module.exports.signUp = function (req, res) {
    return res.render('signUp', {
        title: "Codial | Sign Up"
    })
}



// get the sign up data

module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirmPassword) {
      return res.redirect("back");
    }
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        await User.create(req.body)
       return res.redirect('/users/sign-in')
    }else{
        return res.redirect('back')
    }
    
}
 
  
  

// sign in and create a session

module.exports.createSession = function (req, res) {
return res.redirect('/');

}