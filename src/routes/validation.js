module.exports = {
    validateUsers(req, res, next){
        if(req.method === "POST") {

            req.checkBody("email", "must be valid").isEmail();
            req.checkBody("password", "must be at least 6 characters in length").isLength({min:6})
            req.checkBody("password_conf", "must match password provided").optional().matches(req.body.password);
        }

        const errors = req.validationErrors();

        if(errors) {
            req.flash("error", errors);
            return res.redirect(req.headers.referer);
        } else {
            return next();
        }
    },
    validateWikis(req,res,next){
        if(req.method === "POST") {
            req.checkBody("title", "must be at least 3 characters in length").isLength({min:3});
            req.checkBody("body", "must be at least 15 characters in length").isLength({min:15});
        }
        const errors = req.validationErrors();

        if(errors) {
            req.flash("error", errors);
            return res.redirect(req.headers.referer);
        } else {
            return next();
        }
    }
}