const express = require("express");
const router = express.Router();
const wikiController = require("../controllers/wikiController");
const validation = require("./validation");
const helper = require("../auth/helpers");

router.get("/wikis", wikiController.index);
router.get("/wikis/new", helper.ensureWikiAuthenticated, wikiController.new);
router.post("/wikis/create", helper.ensureWikiAuthenticated, validation.validateWikis,  wikiController.create);
router.get("/wikis/:id", wikiController.show);
router.get("/wikis/:id/edit", wikiController.edit);
router.post("/wikis/:id/update", wikiController.update);
router.post("/wikis/:id/delete", wikiController.delete);
module.exports = router;