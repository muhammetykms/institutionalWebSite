const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../back-end/models/admin");

// Yerel MongoDB bağlantı URI'si
const uri = "mongodb://localhost:27017/myDatabase"; // Veritabanı ismini "your_database_name" ile değiştirin

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}

async function createAdmin() {
  try {
    await connectToDatabase();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    const newAdmin = new Admin({
      name: "muhammet",
      email: "admin@example.com",
      password: hashedPassword,
      picture: "path/to/picture.jpg",
      bio: "Admin bio",
    });

    await newAdmin.save();
    console.log("Admin created successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating admin:", error);
    mongoose.connection.close();
  }
}

createAdmin();
