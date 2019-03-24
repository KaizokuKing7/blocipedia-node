const wikiqueries = require("../db/queries/queries.wikis");
const Authorizer = require("../policies/application");
const Wiki = require("../db/models").Wiki;
module.exports = {
    index(req, res, next) {
        Wiki.findAll()
            .then((wikis) => {
                res.render("wikis/index", { wikis })
            })
    },
    new(req, res, next) {
            res.render("wikis/new");
    },
    create(req, res, next) {
                let newWiki = {
                title: req.body.title,
                body: req.body.body,
                private: req.body.private,
                userId: req.user.id
            };
            wikiqueries.createWiki(newWiki, (err, wiki) => {
                if (err) {
                    res.redirect(500, "/wikis/new");
                } else {
                    console.log(wiki.id)
                    res.redirect(303, `/wikis/${wiki.id}`);
                }                
            });

    },
    show(req, res, next) {
        wikiqueries.getWiki(req.params.id, (err, wiki) => {
            if (err || wiki == null) {
                res.redirect(404, "/wikis");
            } else {
                res.render("wikis/show", { wiki })
            }
        })
    },
    edit(req,res,next) {
        wikiqueries.getWiki(req.params.id, (err, wiki) => {
            if (err || wiki == null) {
                res.redirect('/wikis')
            } else {
                const authorized = new Authorizer(req.user[0], wiki).edit();
                if (authorized) {
                    res.render("wikis/edit", {wiki});
                } else {
                    req.flash("notice", "You don't have permission to do that.");
                    res.redirect(`/wikis/${req.params.id}`);
                }
            }

        })

    },
    update(req,res,next) {
        wikiqueries.updateWiki(req , req.body, (err,wiki) =>{
            if(err || wiki == null){
                res.redirect(401, `/wikis/${req.params.id}/edit`)
            } else {
                res.redirect(`/wikis/${req.params.id}`);
            }
        })
    },
    delete() {

    }
}