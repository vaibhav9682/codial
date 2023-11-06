const fs = require('fs')
const rfs = require('rotating-file-stream')
const path = require('path')

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
})


const development = {
    name: 'development',
    asset_path: 'static',
    session_cookie_key: 'blahsomething',
    db: 'codial_development_DB',
    smtp: {
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'glittertech009@gmail.com',
            pass: 'hlypmkcphbbfqznq'
        }
    },
    google_client_ID: '305142945389-bigmkdg4dd5isfqouo4tjeqhocio9do7.apps.googleusercontent.com',
    google_client_Secret: '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',
    google_callbackURL: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'codeial',
    morgan : {
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.ASSET_PATH,
    session_cookie_key: process.env.SESSION_COOKIE_KEY,
    db: process.env.DB,
    smtp: {
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_GMAIL,
            pass: process.env.USER_PASSWORD
        }
    },
    google_client_ID: process.env.GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.JWT_SECRET,
     morgan : {
        mode:'combined',
        options:{stream:accessLogStream}
    }

}

console.log(process.env.GOOGLE_CALLBACK_URL)
module.exports = eval(process.env.CODEIAL_ENVIROMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIROMENT);
