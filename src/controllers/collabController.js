const collabqueries = require("../db/queries/queries.collabs");
const Collab = require("../db/models").Collaborator;
const User = require("../db/models").User;
const Wiki = require("../db/models").Wiki;


module.exports = {
    create(req,res,next){
                collabqueries.create(req, (err, collab) => {
            if(err){
                req.flash("error", {param:"", msg:err});
            }
            res.redirect(req.headers.referer);
        });

    },
    delete(req, res, next){
        collabqueries.delete(req, (err, deletedRecordsCount) => {
          if(err){
            res.redirect(500, `/wikis/${req.params.wikiId}/edit`);
          } else {
            res.redirect(303, `/wikis/${req.params.wikiId}/edit`);
          }
        });
      }
}