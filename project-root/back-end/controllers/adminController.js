const AdminService = require("../services/adminService");
const jwt = require("jsonwebtoken");

class AdminController {
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      console.log("Received Email:", email); // Email'i loglayalım
      const admin = await AdminService.authenticateAdmin(email, password);
      console.log("Admin Found:", admin); // Admin'i loglayalım

      const payload = { admin: { id: admin.id } };
      console.log("Payload:", payload); // Payload'ı loglayalım

      const token = jwt.sign(payload, "supersecretkey", {
        expiresIn: "10m", // Token ömrünü 10 dakika olarak ayarlayın
      });

      console.log("Generated JWT Token:", token); // JWT token'ı loglayalım
      res.cookie("token", token, { httpOnly: true, expires: 0 });
      res.redirect("/dashboard");
    } catch (error) {
      console.log("Login Error:", error.message);
      res.render("adminPanel/login/login", { errorMessage: error.message });
    }
  }

  static async dashboard(req, res) {
    try {
      res.render("adminPanel/manager/dashboard", { admin: req.admin });
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
}

module.exports = AdminController;
