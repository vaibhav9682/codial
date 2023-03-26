const User = require('../model/user')

module.exports.profile = async function (req, res) {
    let user = await User.findById(req.params.id)
    return res.render('user_profile', {
        profile_user: user
    })
}

module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        await User.findByIdAndUpdate(req.params.id, req.body)
        return res.redirect('back');

    } else {
        return res.status(401).send('Unauthorized')
    }
}

// render sign page
module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }

    return res.render('signIn', {
        title: "Codial | Sign In"
    })
}

// render sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }

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
    } else {
        return res.redirect('back')
    }

}




// sign in and create a session

module.exports.createSession = function (req, res) {
    return res.redirect('/');

}


module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err)
        }
    });
    return res.redirect('/');
}


// creating post in db

