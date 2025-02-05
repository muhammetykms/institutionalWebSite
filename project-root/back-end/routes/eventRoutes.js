const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authenticateToken = require("../middleware/auth");


// Authentication required routes (for CRUD operations)
router.post("/", authenticateToken, eventController.createEvent);
router.put("/:id", authenticateToken, eventController.updateEvent);
router.delete("/:id", authenticateToken, eventController.deleteEvent);

// No authentication required routes (to get data for frontend)
router.get("/", eventController.getEvents);

module.exports = router;
