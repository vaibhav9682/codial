const nodemailer = require('../config/nodemailer')

// another way of export
exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);
    let htmlString = nodemailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs')

    nodemailer.transporter.sendMail({
        from: 'glittertech009@gmail.com',
        to: comment.user.email,
        subject: 'new comment publish',
        html: htmlString
    }, (err, info) => {
        if (err) { console.log('error in sending mail', err); return }
        console.log('mail delieverd', info);
        return;
    });

}