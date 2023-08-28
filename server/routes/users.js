// Import express
const express = require("express");

// Import users-controller
const usersRoutes = require("../controllers/users");

// Create router
const router = express.Router();

// Get routes
router.get("/all", usersRoutes.usersAll);
router.get("/featured-logos", usersRoutes.getFeaturedLogos);
router.get("/user/:userId", usersRoutes.usersGetOne);
router.get("/search", usersRoutes.usersSearch);

// Post routes
router.post("/create", usersRoutes.usersCreate);
router.post("/login", usersRoutes.usersLogin);
router.post("/upload-image/:userId/:uploadType", usersRoutes.usersUploadImage);
router.post("/:userId", usersRoutes.usersUpdateOne);

// Put routes
router.put("/delete", usersRoutes.usersDelete);
router.put("/reset", usersRoutes.usersReset);

// Export router
module.exports = router;
