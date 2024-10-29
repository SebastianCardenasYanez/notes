const router = require("express").Router();
const versionMidelware = require("../versionate/versionMidelware");
const userController = require("../controller/userController");

/**
 * Post/note
 * ! versiones 1.0.0
 */
router.post("/login", versionMidelware('1.0.0'), userController.signInUser);
router.post("/logout", versionMidelware('1.0.0'), userController.logOutUser);
router.post("/", versionMidelware('1.0.0'), userController.addNewUser);

/**
 * Put/note
 * ! versiones 1.0.0
 */
router.put("/:id", versionMidelware('1.0.0'), userController.updateUserById);

/**
 * Delete/note
 * ! versiones 1.0.0
 */
router.delete("/:id", versionMidelware('1.0.0'), userController.deleteUserById);

module.exports = router;