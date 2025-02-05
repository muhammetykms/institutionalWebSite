const Announcement = require("../models/announcement");

exports.createAnnouncement = async (req, res) => {
  const { title, description, link = "" } = req.body;

  console.log("Received data:", req.body); // Tüm gelen verileri loglayın

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  try {
    const newAnnouncement = new Announcement({ title, description, link });
    await newAnnouncement.save();
    res.status(201).json({
      message: "Announcement created successfully",
      announcement: newAnnouncement,
    });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Error creating announcement", error });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({}).sort({ date: -1 }); // Tarihe göre sıralama (en yeni en üstte)
    console.log("Duyurular:", announcements); // Verilerin backend'de başarıyla çekildiğini kontrol edin
    res.json(announcements);
  } catch (error) {
    console.error("Duyurular getirilirken hata oluştu:", error);
    res.status(500).send("Sunucu hatası");
  }
};

exports.updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, description, link = "" } = req.body; // Link opsiyonel ve boş olarak ayarlandı

  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      { title, description, link },
      { new: true }
    );
    res.status(200).json({
      message: "Announcement updated successfully",
      announcement: updatedAnnouncement,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating announcement", error });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    await Announcement.findByIdAndDelete(id);
    res.status(200).json({ message: "Duyuru başarıyla silindi!" });
  } catch (error) {
    console.error("Duyuru silinirken hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası: Duyuru silinemedi." });
  }
};
