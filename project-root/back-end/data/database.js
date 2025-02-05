const mongoose = require("mongoose");
require('dotenv').config(); // .env dosyasını yükleyin

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Veritabanına başarıyla bağlanıldı.");
  } catch (error) {
    console.error("Veritabanı bağlantı hatası:", error);
    process.exit(1); // Uygulamayı durdur
  }
};

module.exports = connectToDatabase;
