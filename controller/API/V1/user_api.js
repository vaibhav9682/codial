const User = require('../../../model/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/env')


module.exports.createSession = async function (req, res) {


    try {
        let user = await User.findOne({ email: req.body.email })

        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: 'Invalid username or password'
            })
        }

        return res.json(200, {
            message: "sign in successful, here is your token, please keep it safe!",
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: '100000' })
            }
        })

    } catch (error) {
        console.log('********', error)
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }

}