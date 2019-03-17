const userQueries = require("../db/queries/queries.users");
const passport = require("passport");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const User = require("../db/models").User;
module.exports = {
    new(req, res, next) {
        
        res.render("users/sign_up")
    },
    sign_up(req, res, next) {
        let user = {
            username: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.password_conf
        };
        userQueries.createUser(user, (err, newuser) => {
            const msg = {
                to: user.email,
                from: 'testexample@gmail.com',
                subject: 'Welcome to Blocipedia',
                text: 'Email sucessfully sent',
                html: '<strong>Email sucessfully sent</strong>',
              };
            if(err){
                req.flash("error", err);
                res.redirect("/user/sign_up");
              } else {
                passport.authenticate("local")(req, res, () => {
                  req.flash("notice", "You've successfully signed in!");
                  res.redirect("/");
                  sgMail.send(msg);
                })
              }
        })

    },
    sign_in(req,res,next){
    }
}