const nodemailer = require('../config/nodemailer')

// another way of export
exports.newComment = async (comment) => {

      let htmlString = nodemailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs')


    try {
        const info = await nodemailer.transporter.sendMail({
            from: 'glittertech009@gmail.com',
            to: comment.user.email, 
            subject: 'new comment publish',
            html: htmlString
        })

        console.log("message sent", info)
    } catch (error) {
        console.log("error in sending mail", error)
    }

    
}