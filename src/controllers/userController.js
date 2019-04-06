const userQueries = require("../db/queries/queries.users");
const passport = require("passport");
const sgMail = require('@sendgrid/mail');
const stripe = require("stripe")("sk_test_nEhekw8wOIzL6ymdxchTujEu00m58aSKyL");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = {
    signUpForm(req, res, next) {        
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
    signInForm(req,res,next){
        res.render("users/sign_in")
    },
    sign_in(req,res,next){
        passport.authenticate("local")(req, res, function () {
            if(!req.user){
              req.flash("notice", "Sign in failed. Please try again.")
              res.redirect("/user/sign_in");
            } else {
              req.flash("notice", "You've successfully signed in!");
              res.redirect("/");
            }
          })
    },
    signOut(req, res, next){
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
      },
      info(req,res,next){
          res.render("users/info")
      },
      upgrade(req,res,next){
            const charge = stripe.charges.create({
                amount: 1000,
                currency: "usd",
                description: "Blocipedia Premium",
                source: req.body.stripeToken
            })
                req.user.update({role: 1})
                .then(() => {
                    res.redirect(`/user/${req.user.id}/info`);
                })
                .catch((err)=> {
                    console.log(err)
                })
      },
      downgrade(req,res,next){
            req.user.update({role: 0})
            .then(()=> {
                    return req.user.getWikis()
                    .then((wikis)=> {
                        wikis.forEach((wiki)=> {
                            if (wiki.private) {
                                wiki.update({private: false})
                            }
                        })
                        res.redirect(`/user/${req.user.id}/info`);
                    })
            })
            .catch((err)=> {
                console.log(err)
            })
  }
}