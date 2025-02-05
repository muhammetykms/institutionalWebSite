// adminService.js

const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

class AdminService {
  static async authenticateAdmin(email, password) {
    try {
      console.log("Searching for admin with email:", email);

      // Admin'i veritabanından çekiyoruz
      const admin = await Admin.findOne({ email: email });

      if (!admin) {
        console.log("Admin not found");
        throw new Error("Admin not found");
      }

      console.log("Admin found in database:", admin);

      // Şifreyi doğruluyoruz
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      console.log("Is Password Valid:", isPasswordValid);

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      return admin;
    } catch (error) {
      console.log("Authenticate Admin Error:", error.message);
      throw error;
    }
  }
}

module.exports = AdminService;
