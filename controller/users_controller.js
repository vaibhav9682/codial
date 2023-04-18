const User = require('../model/user')
const fs = require('fs')
const path = require('path')


module.exports.profile = async function (req, res) {
    let user = await User.findById(req.params.id)
    return res.render('user_profile', {
        profile_user: user
    })
}
module.exports.myProfile = async function (req, res) {
    let mUser = await User.findById(req.user.id)

    return res.render('user_profile', {
        profile_user: mUser

    })
}


module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        // 
        // return res.redirect('back');

        try {
            let user = await User.findById(req.params.id)
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('*******Multer Error:', err)
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    if (user.avatar) {
                        let link = path.join(__dirname, '..', user.avatar)
                        fs.unlinkSync(link)

                    }

                    

                    // this is saving the path of the uploaded file into the avatar field in the user
                    // console.log("---", User.avatarPath + '/' + req.file.filename)
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }

                user.save();
                return res.redirect('back');
            });


        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }



    } else {
        req.flash('error', 'Unauthorized!')
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

    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}


module.exports.destroySession = function (req, res) {

    req.logout(function (err) {
        if (err) {
            console.log(err)
        }
    });
    req.flash('success', 'You have logged out');
    // req.flash('success', 'You have logged out!');


    return res.redirect('/');
}


// creating post in db

