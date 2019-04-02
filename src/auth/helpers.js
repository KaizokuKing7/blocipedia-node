const bcrypt = require("bcryptjs");

module.exports = {
    ensureUserAuthenticated(req, res, next) {
        if (req.user && req.user.id == req.params.id) {
            next();
        }
        else if (!req.user || req.user.id != req.params.id) {
            req.flash("notice", "You must be signed in to do that.")
            return res.redirect("/user/sign_in");
        }
    },
    ensureWikiAuthenticated(req, res, next) {
        if (!req.user) {
            req.flash("notice", "You must be signed in to do that.")
            return res.redirect("/wikis");
        } else {
            next();
        }
    },
    comparePass(userPass, databasePass) {
        return bcrypt.compareSync(userPass, databasePass);
    }
}