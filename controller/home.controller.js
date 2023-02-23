module.exports.home = function (req, res) {
    return res.end('<h1>express server is up to run</h1>')
}
module.exports.content = function (req, res) {
    return res.end("<h1>home content</h1>")
}