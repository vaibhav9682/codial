const User = require('../model/user')
module.exports.profile = async function (req, res) {

    if (req.cookies.user_id) {

        let user = await User.findById(req.cookies.user_id)
        if (user) {
            // console.log(user);
            return res.render('user_profile', {
                user: user
            })

        }
        return res.redirect('/users/sign-in');

    } else {
        return res.redirect('/users/sign-in')
    }

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
    } else {
        return res.redirect('back')
    }

}

//  sign in pocess

module.exports.createSession = async function (req, res) {
    //  find the 




    let user = await User.findOne({ email: req.body.email })

    // user not found
    if (!user) {
        console.log('user not found');
        return res.render('signUp')
    }


    // user has found
    if (user) {

        // password check
        if (user.password != req.body.password) {
            console.log('password is incorrect')
            return res.redirect('back');
        }

        // session creation
        await res.cookie('user_id', user.id);

        return res.redirect('/users/profile');
    } else {
        return res.redirect('back');
    }


}


