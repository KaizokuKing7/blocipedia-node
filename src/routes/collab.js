const express = require("express");
const router = express.Router();
const collabController = require("../controllers/collabController");



router.post("/wikis/:id/edit/collabs", collabController.create);
router.post("/wikis/:wikiId/edit/collabs/:id/delete", collabController.delete);
module.exports = router;