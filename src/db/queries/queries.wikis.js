const Wiki = require("../models").Wiki;
const User = require("../models").User;
const Authorizer = require("../../policies/application");

module.exports = {
    createWiki (newWiki, callback) {
        return Wiki.create(newWiki)
        .then((wiki) => {
            callback(null,wiki)
        })
        .catch((err) => {
            callback(err)
        })
    },
    getWiki(id, callback){
        return Wiki.findOne({where: {id}})
        .then((wiki)=>{
            callback(null,wiki);
        })
        .catch((err)=>{
            callback(err);
        })
    },
    updateWiki(id,updatedWiki, callback){
        return Wiki.findOne({where : {id}})
        .then((wiki) =>{
            if (!wiki) {
                return callback("Wiki not found");
            }
            wiki.update(updatedWiki, {
                fields: Object.keys(updatedWiki)
            })
            .then(()=>{
                callback(null,wiki);
            })
            .catch((err)=>{
                callback(err);
            })
        })
    },
    deleteWiki(req,callback){
        return Wiki.destroy({where: {id: req.params.id}})
        .then((deletededCount)=>{
            callback(null,deletededCount);
        })
        .catch((err)=>{
            callback(err);
        })
    }

}