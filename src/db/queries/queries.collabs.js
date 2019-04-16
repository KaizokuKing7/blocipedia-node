const Collaborator = require("../models").Collaborator;
const User = require("../models").User;

module.exports = {
    create(req, callback) {
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(newcollaborator => {
            if (!newcollaborator) {
                return callback("User not found")
            } else if (newcollaborator.id == req.user.id) {
                return callback("You cant add yourself")
            }
            Collaborator.findOne({
                where: {
                    userId: newcollaborator.id,
                    wikiId: req.params.id
                }
            }).then(collab => {
                if (collab) {
                    return callback("Already a collaborator");
                }
                Collaborator.create({
                    userId: newcollaborator.id,
                    wikiId: req.params.id
                }).then(newcollab => {
                    callback(null, newcollab);
                }).catch(err => {
                    callback(err);
                });
            }).catch(err => {
                callback(err);
            });
        }).catch(err => {
            callback(err);
        });
    },
    delete(req, callback){
        return Collaborator.destroy({
          where: { 
              userId: req.params.id,
              wikiId: req.params.wikiId
           }
        })
        .then((deletedRecordsCount) => {
          callback(null, deletedRecordsCount);
        })
        .catch((err) => {
          callback(err);
        })
      }
}