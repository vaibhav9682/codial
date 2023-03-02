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


// module.exports.create = function (req, res) {
//     if (req.body.password != req.body.confirmPassword) { return res.redirect('back') }

//     User.findOne({ email: req.body.email }, function (err, user) {
//         if (err) { console.log('error in finding user in signing up'); return }

//         if (!user) {
//             User.create(req.body, function (err, user) {
//                 if (err) { console.log('error in creating user'); return }
//                 return res.redirect('/users/sign-in')
//             })
//         } else {
//             return res.redirect('back')
//         }

//     })
// }
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
 
  
  

    


module.exports.createSession = function (req, res) {

}