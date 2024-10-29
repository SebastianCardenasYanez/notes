const router = require("express").Router({ mergeParams: true });
const versionMidelware = require("../versionate/versionMidelware");
const noteController = require("../controller/noteController");
const historyController = require("../controller/historyController");
// las rutas que preceden a otras rutas tienen prioridad
// las rutas con parametros, seguidas por otras rutas, ocupan el 2do lugar
// las rutas con parametros se encuentran en 3er lugar
// las rutas sin parametros ocupan el 4to lugar

/**
 * Get/note
 * ! versiones 1.0.0
 */
router.get("/search/:id", versionMidelware('1.0.0'), noteController.findAllNotesByTitleOrDescription)

router.get("/:id/history", versionMidelware('1.0.0'), noteController.findNoteChangeHistory);

router.get("/:id", versionMidelware('1.0.0'), noteController.findNoteById);

router.get("/", versionMidelware('1.0.0'), noteController.findAllNotes)

/**
 * Post/note
 * ! versiones 1.0.0
 */
router.post("/:id/history", versionMidelware('1.0.0'), historyController.save);

router.post("/", versionMidelware('1.0.0'), noteController.save);

/**
 * Put/note
 * ! versiones 1.0.0
 */
router.put("/:id", versionMidelware('1.0.0'), noteController.updateNoteById);

/**
 * Delete/note
 * ! versiones 1.0.0
 */
router.delete("/:id", versionMidelware('1.0.0'), noteController.deleteNoteById);

module.exports = router;