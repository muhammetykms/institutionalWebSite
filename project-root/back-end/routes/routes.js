const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const authenticateToken = require("../middleware/auth");
// Login route
router.get("/login", (req, res) => res.render("adminPanel/login/login"));
router.post("/login", AdminController.login);

// Dashboard route (Authenticated route)
router.get("/dashboard", authenticateToken, AdminController.dashboard);

// Accountment route (Authenticated route)
router.get("/accountment", authenticateToken, (req, res) => {
  res.render("adminPanel/manager/accountment");
});
// Assignment route (Authenticated route)
router.get("/assignment", authenticateToken, (req, res) => {
  res.render("adminPanel/manager/assignment");
});

// Event route (Authenticated route)
router.get("/event", authenticateToken, (req, res) => {
  res.render("adminPanel/manager/event");
});

// Importing other routes
const announcementRoutes = require("./announcementRoutes");
const assignmentRoutes = require("./assignmentRoutes");
const eventRoutes = require("./eventRoutes");

router.get("/logout", (req, res) => {
  res.clearCookie("token"); // JWT token çerezini temizle
  res.redirect("/login"); // Kullanıcıyı giriş sayfasına yönlendir
});

// Using other routes without authentication
router.use("/announcements", announcementRoutes);
router.use("/assignments", assignmentRoutes);
router.use("/events", eventRoutes);

module.exports = router;