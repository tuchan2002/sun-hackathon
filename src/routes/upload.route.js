const router = require("express").Router();

const uploadController = require("../controllers/upload.controller");

router.post("/image_up", uploadController.uploadImages);

router.post("/image_de", uploadController.destroyImages);

module.exports = router;
