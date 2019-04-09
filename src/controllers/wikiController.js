const wikiqueries = require("../db/queries/queries.wikis");
const Authorizer = require("../policies/application");
const Wiki = require("../db/models").Wiki;
const markdown = require( "markdown" ).markdown;
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
                res.redirect(303, `/wikis/${wiki.id}`);
            }
        });

    },
    show(req, res, next) {
        wikiqueries.getWiki(req.params.id, (err, wiki) => {
            let wikiToMarkdown = {
                title: markdown.toHTML(wiki.title),
                body: markdown.toHTML(wiki.body),
            };
            if (err || wiki == null) {
                res.redirect(404, "/wikis");
            } else {
                res.render("wikis/show", { wiki ,wikiToMarkdown })
            }
        })
    },
    edit(req, res, next) {
        wikiqueries.getWiki(req.params.id, (err, wiki) => {
            if (err || wiki == null) {
                res.redirect('/wikis')
            } else {
                const authorized = new Authorizer(req.user, wiki).edit();
                if (authorized) {
                    res.render("wikis/edit", { wiki });
                } else {
                    req.flash("notice", "You don't have permission to do that.");
                    res.redirect(`/wikis/${req.params.id}`);
                }
            }

        })

    },
    update(req, res, next) {
        wikiqueries.updateWiki(req.params.id, req.body, (err, wiki) => {
            if (err || wiki == null) {
                res.redirect(401, `/wikis/${req.params.id}/edit`)
            } else {
                res.redirect(`/wikis/${req.params.id}`);
            }
        })
    },
    delete(req, res, next) {
        Wiki.findOne({where: {id: req.params.id}}).then((wiki)=>{
          const authorized = new Authorizer(req.user, wiki).delete();
        if (authorized) {
            wikiqueries.deleteWiki(req, (err, wiki) => {
                if (err) {
                    res.redirect(
                        typeof err === "number" ? err : 500,
                        `/wikis/${req.params.id}`
                    )
                } else {
                    res.redirect(303, "/wikis")
                }
            });
        } else {
            req.flash("notice", "You don't have permission to do that.");
            res.redirect(`/wikis/${req.params.id}/edit`);
        }  
        })
        
    }
}