const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

const assignmentController = require("../controllers/assignmentController");

// Authentication required routes (for CRUD operations)
router.post("/", authenticateToken, assignmentController.createAssignment);
router.put("/:id", authenticateToken, assignmentController.updateAssignment);
router.delete("/:id", authenticateToken, assignmentController.deleteAssignment);

// En son yapılan denemeleri getiren route
router.get("/recent", assignmentController.getRecentAssignments);

// No authentication required routes (to get data for frontend)
router.get("/", assignmentController.getAssignments);

module.exports = router;
