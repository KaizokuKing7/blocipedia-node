const bcrypt = require("bcryptjs");

module.exports = {

    
    comparePass(userPass,databasePass) {
        return bcrypt.compareSync(userPass,databasePass);
    }
}