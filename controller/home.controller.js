module.exports.home = function (req, res) {
    return res.render('home', {
        title: "Home"
    })
}
module.exports.content = function (req, res) {
    return res.end("<h1>home content</h1>")
}