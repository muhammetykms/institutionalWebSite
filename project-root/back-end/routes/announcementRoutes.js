const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const announcementController = require("../controllers/announcementController");

// Authentication required routes (for CRUD operations)
router.post("/", authenticateToken, announcementController.createAnnouncement);
router.put(
  "/:id",
  authenticateToken,
  announcementController.updateAnnouncement
);
router.delete(
  "/:id",
  authenticateToken,
  announcementController.deleteAnnouncement
);

// No authentication required routes (to get data for frontend)
router.get("/", announcementController.getAnnouncements);

module.exports = router;
