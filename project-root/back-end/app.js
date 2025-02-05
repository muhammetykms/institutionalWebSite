const express = require("express");
const connectToDatabase = require("./data/database");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors"); // Cors added
const authenticateToken = require("./middleware/auth"); // authenticateToken middleware'ini dahil edin
require("dotenv").config();
const assignmentRoutes = require("./routes/assignmentRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Veritabanına bağlan
connectToDatabase();

// Statik dosya dizinlerini ayarla
app.use(express.static(path.join(__dirname, "../front-end/public")));
app.use(express.static(path.join(__dirname, "../front-end/views/userPanel")));

// Middleware'leri yapılandır
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Cors Configuration
app.use(cors());

// Görüntüleme motorunu ve görüntü dizinini ayarla
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../front-end/views"));

// Ana sayfa rotası - index.html dosyasını sun
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../front-end/views/userPanel", "index.html")
  );
});

// Rota dosyalarını kullan
app.use("/", routes);
app.use("/assignments", assignmentRoutes); // authenticateToken middleware'i kaldırıldı
app.use("/announcements", announcementRoutes); // authenticateToken middleware'i kaldırıldı
app.use("/events", eventRoutes); // authenticateToken middleware'i kaldırıldı

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
