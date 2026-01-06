const express = require("express");
const router = express.Router();
const TrainerController = require("../controllers/TrainerController");

// Rutas CRUD
router.get("/", TrainerController.index);
router.get("/:id", TrainerController.show);
router.post("/", TrainerController.create);
router.patch("/:id", TrainerController.update);
router.delete("/:id", TrainerController.destroy);

module.exports = router;
