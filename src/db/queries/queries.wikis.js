const Wiki = require("../models").Wiki;
const User = require("../models").User;


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
        Wiki.findOne({where: {id}})
        .then((wiki)=>{
            callback(null,wiki);
        })
        .catch((err)=>{
            callback(err);
        })
    },
    updateWiki(req,updatedWiki, callback){
        return Wiki.findOne({where : {id : req.params.id}})
        .then((wiki) =>{
            console.log(wiki)
        })
    }
}