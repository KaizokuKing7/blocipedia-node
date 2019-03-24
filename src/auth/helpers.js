const bcrypt = require("bcryptjs");

module.exports = {
    ensureAuthenticated(req, res, next) {
        if (!req.user){
          req.flash("notice", "You must be signed in to do that.")
          return res.redirect("/wikis");
        } else {
          next();
        }
      },    
    comparePass(userPass,databasePass) {
        return bcrypt.compareSync(userPass,databasePass);
    }
}